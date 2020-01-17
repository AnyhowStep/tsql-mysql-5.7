import * as tm from "type-mapping";
import * as mysql from "mysql";
import * as tsql from "@tsql/tsql";
import {sqlfier, insertOneSqlString} from "../../sqlfier";

export interface SharedConnectionInformation {
    /**
     * mutable
     */
    transactionData : (
        | undefined
        | {
            minimumIsolationLevel : tsql.IsolationLevel,
            accessMode : tsql.TransactionAccessMode,
        }
    );
    /**
     * mutable
     */
    savepointId : number;
}

export class Connection implements
    tsql.IConnection,
    tsql.ConnectionComponent.InTransaction,
    tsql.ConnectionComponent.Savepoint<tsql.ITransactionConnection>,
    tsql.ConnectionComponent.InSavepoint
{
    readonly pool: tsql.IPool;
    readonly eventEmitters: tsql.IConnectionEventEmitterCollection;

    private readonly connectionImpl : mysql.PoolConnection;
    private readonly asyncQueue : tsql.AsyncQueue<mysql.PoolConnection>;
    private readonly sharedConnectionInformation : SharedConnectionInformation;

    constructor (
        {
            pool,
            eventEmitters,
            connectionImpl,
            asyncQueue,
            sharedConnectionInformation,
        } :
        {
            pool : tsql.IPool,
            eventEmitters : tsql.IConnectionEventEmitterCollection,
            connectionImpl : mysql.PoolConnection,
            asyncQueue : undefined|tsql.AsyncQueue<mysql.PoolConnection>,
            sharedConnectionInformation : SharedConnectionInformation,
        }
    ) {
        this.pool = pool;
        this.eventEmitters = eventEmitters;

        this.connectionImpl = connectionImpl;
        this.asyncQueue = asyncQueue instanceof tsql.AsyncQueue ?
            asyncQueue :
            new tsql.AsyncQueue<mysql.PoolConnection>(() => {
                return {
                    item : connectionImpl,
                    deallocate : async () => {},
                };
            });
        this.sharedConnectionInformation = sharedConnectionInformation;
        this.sharedConnectionInformation;
    }


    tryGetFullConnection(): tsql.IConnection | undefined {
        if (
            this.sharedConnectionInformation.transactionData != undefined &&
            this.sharedConnectionInformation.transactionData.accessMode == tsql.TransactionAccessMode.READ_ONLY
        ) {
            /**
             * Can't give a full connection if we are in a readonly transaction.
             * No `INSERT/UPDATE/DELETE` allowed.
             */
            return undefined;
        } else {
            return this as unknown as tsql.IConnection;
        }
    }
    lock<ResultT>(callback: tsql.LockCallback<tsql.IConnection, ResultT>): Promise<ResultT> {
        return this.asyncQueue.lock((nestedAsyncQueue) => {
            const nestedConnection = new Connection({
                pool : this.pool,
                eventEmitters : this.eventEmitters,
                connectionImpl : this.connectionImpl,
                asyncQueue : nestedAsyncQueue,
                sharedConnectionInformation : this.sharedConnectionInformation
            });
            return callback(
                nestedConnection as unknown as tsql.IConnection
            );
        });
    }

    rollback () : Promise<void> {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot rollback"));
        }
        return this.rawQuery("ROLLBACK")
            .then(() => {
                this.sharedConnectionInformation.transactionData = undefined;
                /**
                 * @todo Handle sync errors somehow.
                 * Maybe propagate them to `IPool` and have an `onError` handler or something
                 */
                this.eventEmitters.rollback();
            });
    }
    commit () : Promise<void> {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot commit"));
        }
        return this.rawQuery("COMMIT")
            .then(() => {
                this.sharedConnectionInformation.transactionData = undefined;
                /**
                 * @todo Handle sync errors somehow.
                 * Maybe propagate them to `IPool` and have an `onError` handler or something
                 */
                this.eventEmitters.commit();
            });
    }

    getMinimumIsolationLevel () : tsql.IsolationLevel {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            throw new Error(`Not in transaction`);
        }
        return this.sharedConnectionInformation.transactionData.minimumIsolationLevel;
    }
    getTransactionAccessMode () : tsql.TransactionAccessMode {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            throw new Error(`Not in transaction`);
        }
        return this.sharedConnectionInformation.transactionData.accessMode;
    }

    private transactionImpl<ResultT> (
        minimumIsolationLevel : tsql.IsolationLevel,
        accessMode : tsql.TransactionAccessMode,
        callback : tsql.LockCallback<tsql.ITransactionConnection, ResultT>|tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ) : Promise<ResultT> {
        if (this.sharedConnectionInformation.transactionData != undefined) {
            return Promise.reject(new Error(`Transaction already started or starting`));
        }
        /**
         * SQLite only has `SERIALIZABLE` transactions.
         * So, no matter what we request, we will always get a
         * `SERIALIZABLE` transaction.
         *
         * However, we will just pretend that we have all
         * isolation levels supported.
         */
        this.sharedConnectionInformation.transactionData = {
            minimumIsolationLevel,
            accessMode,
        };

        return new Promise<ResultT>((resolve, reject) => {
            const isolationLevelSql = (
                minimumIsolationLevel == tsql.IsolationLevel.READ_UNCOMMITTED ?
                "READ UNCOMMITTED" :
                minimumIsolationLevel == tsql.IsolationLevel.READ_COMMITTED ?
                "READ COMMITTED" :
                minimumIsolationLevel == tsql.IsolationLevel.REPEATABLE_READ ?
                "REPEATABLE READ" :
                minimumIsolationLevel == tsql.IsolationLevel.SERIALIZABLE ?
                "SERIALIZABLE" :
                "UNKNOWN ISOLATION LEVEL"
            );
            if (isolationLevelSql == "UNKNOWN ISOLATION LEVEL") {
                throw new Error(`Invalid isolation level ${minimumIsolationLevel}`);
            }
            const accessModeSql = (
                accessMode == tsql.TransactionAccessMode.READ_ONLY ?
                "READ ONLY" :
                "READ WRITE"
            );
            this.rawQuery(`SET TRANSACTION ISOLATION LEVEL ${isolationLevelSql}`)
                .then(() => {
                    return this.rawQuery(`START TRANSACTION ${accessModeSql}`);
                })
                .then(() => {
                    /**
                     * @todo Handle sync errors somehow.
                     * Maybe propagate them to `IPool` and have an `onError` handler or something
                     */
                    this.eventEmitters.commit();
                    if (!this.isInTransaction()) {
                        /**
                         * Why did one of the `OnCommit` listeners call `commit()` or `rollback()`?
                         */
                        throw new Error(`Expected to be in transaction`);
                    }
                    return callback(this as unknown as tsql.ITransactionConnection);
                })
                .then((result) => {
                    if (!this.isInTransaction()) {
                        resolve(result);
                        return;
                    }

                    this.commit()
                        .then(() => {
                            resolve(result);
                        })
                        .catch((commitErr) => {
                            this.rollback()
                                .then(() => {
                                    reject(commitErr);
                                })
                                .catch((rollbackErr) => {
                                    commitErr.rollbackErr = rollbackErr;
                                    reject(commitErr);
                                });
                        });
                })
                .catch((err) => {
                    if (!this.isInTransaction()) {
                        reject(err);
                        return;
                    }

                    this.rollback()
                        .then(() => {
                            reject(err);
                        })
                        .catch((rollbackErr) => {
                            err.rollbackErr = rollbackErr;
                            reject(err);
                        });
                });
        });
    }
    private transactionIfNotInOneImpl<ResultT> (
        minimumIsolationLevel : tsql.IsolationLevel,
        accessMode : tsql.TransactionAccessMode,
        callback : tsql.LockCallback<tsql.ITransactionConnection, ResultT>|tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ) : Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            if (nestedConnection.isInTransaction()) {
                if (tsql.IsolationLevelUtil.isWeakerThan(
                    this.getMinimumIsolationLevel(),
                    minimumIsolationLevel
                )) {
                    /**
                     * For example, our current isolation level is
                     * `READ_UNCOMMITTED` but we want
                     * `SERIALIZABLE`.
                     *
                     * Obviously, `READ_UNCOMMITTED` is weaker than
                     * `SERIALIZABLE`.
                     *
                     * So, we error.
                     *
                     * @todo Custom error type
                     */
                    return Promise.reject(new Error(`Current isolation level is ${this.getMinimumIsolationLevel()}; cannot guarantee ${minimumIsolationLevel}`));
                }
                if (tsql.TransactionAccessModeUtil.isLessPermissiveThan(
                    this.getTransactionAccessMode(),
                    accessMode
                )) {
                    return Promise.reject(new Error(`Current transaction access mode is ${this.getTransactionAccessMode()}; cannot allow ${accessMode}`));
                }
                try {
                    return callback(nestedConnection);
                } catch (err) {
                    return Promise.reject(err);
                }
            } else {
                return (nestedConnection as unknown as Connection).transactionImpl(
                    minimumIsolationLevel,
                    accessMode,
                    callback
                );
            }
        });
    }

    transactionIfNotInOne<ResultT>(
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.transactionIfNotInOneImpl(
            args.length == 1 ? tsql.IsolationLevel.SERIALIZABLE : args[0],
            tsql.TransactionAccessMode.READ_WRITE,
            args.length == 1 ? args[0] : args[1]
        );
    }
    readOnlyTransactionIfNotInOne<ResultT>(
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransactionIfNotInOne<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransactionIfNotInOne<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.transactionIfNotInOneImpl(
            args.length == 1 ? tsql.IsolationLevel.SERIALIZABLE : args[0],
            tsql.TransactionAccessMode.READ_ONLY,
            args.length == 1 ? args[0] : args[1]
        );
    }
    rawQuery(sql: string): Promise<tsql.RawQueryResult> {
        return this.asyncQueue.enqueue<tsql.RawQueryResult>((connectionImpl) => {
            return new Promise<tsql.RawQueryResult>((resolve, reject) => {
                connectionImpl.query(
                    sql,
                    (err, results, rawFieldArr) => {
                        if (err != undefined) {
                            if (err instanceof Error) {
                                if (err.code == "ER_DATA_OUT_OF_RANGE") {
                                    reject(new tsql.DataOutOfRangeError(err.message));
                                } else {
                                    reject(err);
                                }
                            } else {
                                reject(err);
                            }
                            return;
                        }
                        if (rawFieldArr == undefined) {
                            resolve({
                                query   : { sql },
                                results,
                                columns : undefined,
                            });
                            return;
                        }
                        /**
                         * Sometimes, `fieldArr` is an array of `undefined` values.
                         * I don't know why.
                         */
                        const fieldArr = rawFieldArr.filter((field) : field is mysql.FieldInfo => {
                            return field != undefined;
                        });
                        resolve({
                            query   : { sql },
                            results,
                            columns : fieldArr.map(field => field.name),
                        });
                    }
                )
            });
        });
    }
    async select(query: tsql.IQueryBase<tsql.QueryBaseData>): Promise<tsql.SelectResult> {
        const sql = tsql.AstUtil.toSql(query, sqlfier);
        return this.rawQuery(sql)
            .then((resultSet): tsql.SelectResult => {
                if (resultSet.columns == undefined) {
                    throw new Error(`Expected at least one column to be selected`);
                } else {
                    return {
                        query : resultSet.query,
                        rows : resultSet.results as Record<string, unknown>[],
                        columns : resultSet.columns,
                    };
                }
            });
    }
    async insertOne<TableT extends tsql.InsertableTable>(
        table: TableT,
        row: tsql.BuiltInInsertRow<TableT>
    ): Promise<tsql.InsertOneResult> {
        const sql = insertOneSqlString(table, row, "");
        return this.lock((rawNestedConnection) => {
            const nestedConnection = (rawNestedConnection as unknown as Connection);
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    console.log(result);
                    if (!tsql.TypeUtil.isObjectWithOwnEnumerableKeys<
                        Record<
                            | "insertId"
                            | "affectedRows",
                            unknown
                        >
                    >()(
                        result.results,
                        [
                            "insertId",
                            "affectedRows",
                        ]
                    )) {
                        throw new Error(`Expected InsertResult`);
                    }
                    result.results

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    const autoIncrementId = (
                        (table.autoIncrement == undefined) ?
                        undefined :
                        (row[table.autoIncrement as keyof typeof row] === undefined) ?
                        await tsql
                            .selectValue(() => tsql.expr(
                                {
                                    mapper : tm.mysql.bigIntSigned(),
                                    usedRef : tsql.UsedRefUtil.fromColumnRef({}),
                                },
                                "LAST_INSERT_ROW()"
                            ))
                            .fetchValue(nestedConnection) :
                        /**
                         * Emulate MySQL behaviour
                         */
                        BigInt(0)
                    );

                    const insertOneResult : tsql.InsertOneResult = {
                        query : { sql, },
                        insertedRowCount : BigInt(1) as 1n,
                        autoIncrementId : (
                            autoIncrementId == undefined ?
                            undefined :
                            tm.BigIntUtil.equal(autoIncrementId, BigInt(0)) ?
                            undefined :
                            autoIncrementId
                        ),
                        warningCount : BigInt(0),
                        message : "ok",
                    };
                    return insertOneResult;
                })
                .catch((err) => {
                    throw err;
                });
        });
    }
    insertMany<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(table: TableT, rows: readonly [{readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}, ...({readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;})[]]): Promise<tsql.InsertManyResult> {
        table;
        rows;
        throw new Error("Method not implemented.");
    }
    insertIgnoreOne<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(table: TableT, row: {readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}): Promise<tsql.InsertIgnoreOneResult> {
        table;
        row;
        throw new Error("Method not implemented.");
    }
    insertIgnoreMany<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(table: TableT, rows: readonly [{readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}, ...({readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;})[]]): Promise<tsql.InsertIgnoreManyResult> {
        table;
        rows;
        throw new Error("Method not implemented.");
    }
    replaceOne<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;} & {deleteEnabled: true;}>(table: TableT, row: {readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}): Promise<tsql.ReplaceOneResult> {
        table;
        row;
        throw new Error("Method not implemented.");
    }
    replaceMany<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;} & {deleteEnabled: true;}>(table: TableT, rows: readonly [{readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}, ...({readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;})[]]): Promise<tsql.ReplaceManyResult> {
        table;
        rows;
        throw new Error("Method not implemented.");
    }
    insertSelect<QueryT extends tsql.IQueryBase<{fromClause: tsql.IFromClause<tsql.FromClauseData>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[]; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}> & tsql.IQueryBase<{fromClause: tsql.IFromClause<{outerQueryJoins: undefined; currentJoins: readonly tsql.IJoin<tsql.JoinData>[] | undefined;}>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[] | undefined; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}>, TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(query: QueryT, table: TableT, row: tsql.InsertSelectRow<QueryT, TableT>): Promise<tsql.InsertManyResult> {
        query;
        table;
        row;
        throw new Error("Method not implemented.");
    }
    insertIgnoreSelect<QueryT extends tsql.IQueryBase<{fromClause: tsql.IFromClause<tsql.FromClauseData>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[]; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}> & tsql.IQueryBase<{fromClause: tsql.IFromClause<{outerQueryJoins: undefined; currentJoins: readonly tsql.IJoin<tsql.JoinData>[] | undefined;}>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[] | undefined; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}>, TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(query: QueryT, table: TableT, row: tsql.InsertSelectRow<QueryT, TableT>): Promise<tsql.InsertIgnoreManyResult> {
        query;
        table;
        row;
        throw new Error("Method not implemented.");
    }
    replaceSelect<QueryT extends tsql.IQueryBase<{fromClause: tsql.IFromClause<tsql.FromClauseData>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[]; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}> & tsql.IQueryBase<{fromClause: tsql.IFromClause<{outerQueryJoins: undefined; currentJoins: readonly tsql.IJoin<tsql.JoinData>[] | undefined;}>; selectClause: readonly (tsql.ColumnMap | tsql.IColumn<tsql.ColumnData> | tsql.IExprSelectItem<tsql.ExprSelectItemData> | tsql.ColumnRef)[] | undefined; limitClause: tsql.LimitClause | undefined; compoundQueryClause: readonly tsql.CompoundQuery[] | undefined; compoundQueryLimitClause: tsql.LimitClause | undefined; mapDelegate: tsql.MapDelegate<never, never, unknown> | undefined;}>, TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;} & {deleteEnabled: true;}>(query: QueryT, table: TableT, row: tsql.InsertSelectRow<QueryT, TableT>): Promise<tsql.ReplaceManyResult> {
        query;
        table;
        row;
        throw new Error("Method not implemented.");
    }
    update<TableT extends tsql.ITable> (
        table : TableT,
        whereClause : tsql.WhereClause,
        assignmentMap : tsql.BuiltInAssignmentMap<TableT>
    ) : Promise<tsql.UpdateResult> {
        table;
        whereClause;
        assignmentMap;
        throw new Error("Method not implemented.");
    }
    delete(table: tsql.DeletableTable, whereClause: tsql.WhereClause): Promise<tsql.DeleteResult> {
        table;
        whereClause;
        throw new Error("Method not implemented.");
    }
    tryFetchSchemaMeta(schemaAlias: string | undefined): Promise<tsql.SchemaMeta | undefined> {
        schemaAlias;
        throw new Error("Method not implemented.");
    }
    tryFetchGeneratedColumnExpression(schemaAlias: string | undefined, tableAlias: string, columnAlias: string): Promise<string | undefined> {
        schemaAlias;
        tableAlias;
        columnAlias;
        throw new Error("Method not implemented.");
    }
    transaction<ResultT>(
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transaction<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transaction<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
        )
    ): Promise<ResultT> {
        args;
        throw new Error("Method not implemented.");
    }
    readOnlyTransaction<ResultT>(
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransaction<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransaction<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
        )
    ): Promise<ResultT> {
        args;
        throw new Error("Method not implemented.");
    }
    isInTransaction(): this is tsql.ITransactionConnection {
        return this.sharedConnectionInformation.transactionData != undefined;
    }

    private savepointData : (
        | undefined
        | {
            savepointName : string,
        }
    ) = undefined;
    private savepointImpl<ResultT> (
        callback : tsql.LockCallback<tsql.ITransactionConnection & tsql.ConnectionComponent.InSavepoint, ResultT>
    ) : Promise<ResultT> {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            return Promise.reject(new Error(`Cannot use savepoint outside transaction`));
        }
        if (this.savepointData != undefined) {
            return Promise.reject(new Error(`A savepoint is already in progress`));
        }
        const savepointData = {
            savepointName : `tsql_savepoint_${++this.sharedConnectionInformation.savepointId}`,
        };
        this.savepointData = savepointData;
        this.eventEmitters.savepoint();

        return new Promise<ResultT>((resolve, reject) => {
            this.rawQuery(`SAVEPOINT ${savepointData.savepointName}`)
                .then(() => {
                    if (!this.isInTransaction()) {
                        throw new Error(`Expected to be in transaction`);
                    }
                    if (this.savepointData != savepointData) {
                        /**
                         * Why did the savepoint information change?
                         */
                        throw new Error(`Expected to be in savepoint ${savepointData.savepointName}`);
                    }
                    return callback(this as tsql.ITransactionConnection & tsql.ConnectionComponent.InSavepoint);
                })
                .then((result) => {
                    if (!this.isInTransaction()) {
                        /**
                         * `.rollback()` was probably explicitly called
                         */
                        resolve(result);
                        return;
                    }
                    if (this.savepointData == undefined) {
                        /**
                         * `.rollbackToSavepoint()` was probably explicitly called
                         */
                        resolve(result);
                        return;
                    }
                    if (this.savepointData != savepointData) {
                        /**
                         * Some weird thing is going on here.
                         * This should never happen.
                         */
                        reject(new Error(`Expected to be in savepoint ${savepointData.savepointName} or to not be in a savepoint`));
                        return;
                    }

                    this.releaseSavepoint()
                        .then(() => {
                            resolve(result);
                        })
                        .catch((_releaseErr) => {
                            /**
                             * Being unable to release a savepoint isn't so bad.
                             * It usually just means the DBMS cannot reclaim resources
                             * until the transaction ends.
                             *
                             * @todo Do something with `_releaseErr`
                             */
                            resolve(result);
                        });
                })
                .catch((err) => {
                    if (!this.isInTransaction()) {
                        /**
                         * `.rollback()` was probably explicitly called
                         */
                        reject(err);
                        return;
                    }
                    if (this.savepointData == undefined) {
                        /**
                         * `.rollbackToSavepoint()` was probably explicitly called
                         */
                        reject(err);
                        return;
                    }
                    if (this.savepointData != savepointData) {
                        /**
                         * Some weird thing is going on here.
                         * This should never happen.
                         */
                        err.savepointErr = new Error(`Expected to be in savepoint ${savepointData.savepointName} or to not be in a savepoint`);
                        reject(err);
                        return;
                    }

                    this.rollbackToSavepoint()
                        .then(() => {
                            reject(err);
                        })
                        .catch((rollbackToSavepointErr) => {
                            err.rollbackToSavepointErr = rollbackToSavepointErr;
                            reject(err);
                        });
                });
        });
    }
    rollbackToSavepoint () : Promise<void> {
        if (this.savepointData == undefined) {
            return Promise.reject(new Error("Not in savepoint; cannot release savepoint"));
        }
        return this.rawQuery(`ROLLBACK TO SAVEPOINT ${this.savepointData.savepointName}`)
            .then(() => {
                this.savepointData = undefined;
                this.eventEmitters.rollbackToSavepoint();
            });
    }
    releaseSavepoint () : Promise<void> {
        if (this.savepointData == undefined) {
            return Promise.reject(new Error("Not in savepoint; cannot release savepoint"));
        }
        return this.rawQuery(`RELEASE SAVEPOINT ${this.savepointData.savepointName}`)
            .then(() => {
                this.savepointData = undefined;
                this.eventEmitters.releaseSavepoint();
            });
    }
    savepoint<ResultT> (
        callback : tsql.LockCallback<tsql.ITransactionConnection & tsql.ConnectionComponent.InSavepoint, ResultT>
    ) : Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            return (nestedConnection as unknown as Connection).savepointImpl(
                callback
            );
        });
    }

    private deallocatePromise : Promise<void>|undefined = undefined;
    deallocate (): Promise<void> {
        if (this.deallocatePromise == undefined) {
            this.deallocatePromise = this.asyncQueue.stop()
                .then(
                    () => this.connectionImpl.release(),
                    (err) => {
                        this.connectionImpl.release();
                        throw err;
                    }
                );
            return this.deallocatePromise;
        }
        return Promise.reject("This connection has already been deallocated");
    }
    isDeallocated(): boolean {
        return this.deallocatePromise != undefined;
    }
}
