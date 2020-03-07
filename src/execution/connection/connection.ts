import * as tm from "type-mapping";
import * as mysql from "mysql";
import * as squill from "@squill/squill";
import {sqlfier, insertOneSqlString, insertManySqlString, deleteSqlString, updateSqlString, insertSelectSqlString} from "../../sqlfier";
import {isOkPacket} from "./ok-packet";
import {tryFetchSchemaMeta, tryFetchGeneratedColumnExpression} from "../../schema-introspection";

export interface SharedConnectionInformation {
    /**
     * mutable
     */
    transactionData : (
        | undefined
        | {
            minimumIsolationLevel : squill.IsolationLevel,
            accessMode : squill.TransactionAccessMode,
        }
    );
    /**
     * mutable
     */
    savepointId : number;
}

export class Connection implements
    squill.IConnection,
    squill.ConnectionComponent.InTransaction,
    squill.ConnectionComponent.Savepoint<squill.ITransactionConnection>,
    squill.ConnectionComponent.InSavepoint
{
    readonly pool: squill.IPool;
    readonly eventEmitters: squill.IConnectionEventEmitterCollection;

    private readonly connectionImpl : mysql.PoolConnection;
    private readonly asyncQueue : squill.AsyncQueue<mysql.PoolConnection>;
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
            pool : squill.IPool,
            eventEmitters : squill.IConnectionEventEmitterCollection,
            connectionImpl : mysql.PoolConnection,
            asyncQueue : undefined|squill.AsyncQueue<mysql.PoolConnection>,
            sharedConnectionInformation : SharedConnectionInformation,
        }
    ) {
        this.pool = pool;
        this.eventEmitters = eventEmitters;

        this.connectionImpl = connectionImpl;
        this.asyncQueue = asyncQueue instanceof squill.AsyncQueue ?
            asyncQueue :
            new squill.AsyncQueue<mysql.PoolConnection>(() => {
                return {
                    item : connectionImpl,
                    deallocate : async () => {},
                };
            });
        this.sharedConnectionInformation = sharedConnectionInformation;
        this.sharedConnectionInformation;
    }


    tryGetFullConnection(): squill.IConnection | undefined {
        if (
            this.sharedConnectionInformation.transactionData != undefined &&
            this.sharedConnectionInformation.transactionData.accessMode == squill.TransactionAccessMode.READ_ONLY
        ) {
            /**
             * Can't give a full connection if we are in a readonly transaction.
             * No `INSERT/UPDATE/DELETE` allowed.
             */
            return undefined;
        } else {
            return this as unknown as squill.IConnection;
        }
    }
    lock<ResultT>(callback: squill.LockCallback<squill.IConnection, ResultT>): Promise<ResultT> {
        return this.asyncQueue.lock((nestedAsyncQueue) => {
            const nestedConnection = new Connection({
                pool : this.pool,
                eventEmitters : this.eventEmitters,
                connectionImpl : this.connectionImpl,
                asyncQueue : nestedAsyncQueue,
                sharedConnectionInformation : this.sharedConnectionInformation
            });
            return callback(
                nestedConnection as unknown as squill.IConnection
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

    getMinimumIsolationLevel () : squill.IsolationLevel {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            throw new Error(`Not in transaction`);
        }
        return this.sharedConnectionInformation.transactionData.minimumIsolationLevel;
    }
    getTransactionAccessMode () : squill.TransactionAccessMode {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            throw new Error(`Not in transaction`);
        }
        return this.sharedConnectionInformation.transactionData.accessMode;
    }

    private transactionImpl<ResultT> (
        minimumIsolationLevel : squill.IsolationLevel,
        accessMode : squill.TransactionAccessMode,
        callback : squill.LockCallback<squill.ITransactionConnection, ResultT>|squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
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
                minimumIsolationLevel == squill.IsolationLevel.READ_UNCOMMITTED ?
                "READ UNCOMMITTED" :
                minimumIsolationLevel == squill.IsolationLevel.READ_COMMITTED ?
                "READ COMMITTED" :
                minimumIsolationLevel == squill.IsolationLevel.REPEATABLE_READ ?
                "REPEATABLE READ" :
                minimumIsolationLevel == squill.IsolationLevel.SERIALIZABLE ?
                "SERIALIZABLE" :
                "UNKNOWN ISOLATION LEVEL"
            );
            if (isolationLevelSql == "UNKNOWN ISOLATION LEVEL") {
                throw new Error(`Invalid isolation level ${minimumIsolationLevel}`);
            }
            const accessModeSql = (
                accessMode == squill.TransactionAccessMode.READ_ONLY ?
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
                    return callback(this as unknown as squill.ITransactionConnection);
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
        minimumIsolationLevel : squill.IsolationLevel,
        accessMode : squill.TransactionAccessMode,
        callback : squill.LockCallback<squill.ITransactionConnection, ResultT>|squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ) : Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            if (nestedConnection.isInTransaction()) {
                if (squill.IsolationLevelUtil.isWeakerThan(
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
                if (squill.TransactionAccessModeUtil.isLessPermissiveThan(
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
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.ITransactionConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.ITransactionConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.transactionIfNotInOneImpl(
            args.length == 1 ? squill.IsolationLevel.SERIALIZABLE : args[0],
            squill.TransactionAccessMode.READ_WRITE,
            args.length == 1 ? args[0] : args[1]
        );
    }
    readOnlyTransactionIfNotInOne<ResultT>(
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransactionIfNotInOne<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransactionIfNotInOne<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.transactionIfNotInOneImpl(
            args.length == 1 ? squill.IsolationLevel.SERIALIZABLE : args[0],
            squill.TransactionAccessMode.READ_ONLY,
            args.length == 1 ? args[0] : args[1]
        );
    }
    rawQuery(sql: string): Promise<squill.RawQueryResult> {
        return this.asyncQueue.enqueue<squill.RawQueryResult>((connectionImpl) => {
            return new Promise<squill.RawQueryResult>((resolve, reject) => {
                //console.log("sql", sql);
                connectionImpl.query(
                    sql,
                    (err, results, rawFieldArr) => {
                        if (err != undefined) {
                            /**
                             * @todo https://github.com/mysqljs/mysql/blob/1e2c3506de794d18e7c9a5b946089a071f0ea4c7/lib/protocol/constants/errors.js
                             */
                            if (err instanceof Error) {
                                if (err.code == "ER_DATA_OUT_OF_RANGE") {
                                    reject(new squill.DataOutOfRangeError({
                                        innerError : err,
                                        sql,
                                    }));
                                } else if (err.code == "ER_PARSE_ERROR" || err.code == "ER_SYNTAX_ERROR") {
                                    reject(new squill.InvalidSqlError({
                                        innerError : err,
                                        sql,
                                    }));
                                } else {
                                    reject(new squill.SqlError({
                                        innerError : err,
                                        sql,
                                    }));
                                }
                            } else {
                                reject(new squill.SqlError({
                                    innerError : err,
                                    sql,
                                }));
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
    async select(query: squill.IQueryBase<squill.QueryBaseData>): Promise<squill.SelectResult> {
        const sql = squill.AstUtil.toSql(query, sqlfier);
        return this.rawQuery(sql)
            .then((resultSet): squill.SelectResult => {
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
    async insertOne<TableT extends squill.InsertableTable>(
        table: TableT,
        row: squill.BuiltInInsertRow<TableT>
    ): Promise<squill.InsertOneResult> {
        const sql = insertOneSqlString("INSERT", table, row);
        return this.lock((rawNestedConnection) => {
            const nestedConnection = (rawNestedConnection as unknown as Connection);
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertOneResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    const autoIncrementId = (
                        (table.autoIncrement == undefined) ?
                        undefined :
                        (row[table.autoIncrement as keyof typeof row] === undefined) ?
                        await squill
                            .selectValue(() => squill.expr(
                                {
                                    mapper : tm.mysql.bigIntSigned(),
                                    usedRef : squill.UsedRefUtil.fromColumnRef({}),
                                    isAggregate : false,
                                },
                                "LAST_INSERT_ID()"
                            ))
                            .fetchValue(nestedConnection) :
                        /**
                         * Emulate MySQL behaviour
                         */
                        BigInt(0)
                    );

                    const insertOneResult : squill.InsertOneResult = {
                        query : { sql, },
                        insertedRowCount : BigInt(1) as 1n,
                        autoIncrementId : (
                            autoIncrementId == undefined ?
                            undefined :
                            tm.BigIntUtil.equal(autoIncrementId, BigInt(0)) ?
                            undefined :
                            autoIncrementId
                        ),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                    return insertOneResult;
                })
                .catch((err) => {
                    throw err;
                });
        });
    }
    insertMany<TableT extends squill.InsertableTable>(
        table: TableT,
        rows: readonly [squill.BuiltInInsertRow<TableT>, ...squill.BuiltInInsertRow<TableT>[]]
    ): Promise<squill.InsertManyResult> {
        const sql = insertManySqlString("INSERT", table, rows);
        return this.lock(async (rawNestedConnection) : Promise<squill.InsertManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedRowCount : BigInt(result.results.affectedRows),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    insertIgnoreOne<TableT extends squill.InsertableTable>(
        table: TableT,
        row: squill.BuiltInInsertRow<TableT>
    ): Promise<squill.InsertIgnoreOneResult> {
        const sql = insertOneSqlString("INSERT IGNORE", table, row);
        return this.lock((rawNestedConnection) => {
            const nestedConnection = (rawNestedConnection as unknown as Connection);
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertIgnoreOneResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    if (result.results.affectedRows == 0) {
                        return {
                            query : { sql, },
                            insertedRowCount : BigInt(result.results.affectedRows) as 0n,
                            autoIncrementId : undefined,
                            warningCount : BigInt(result.results.warningCount),
                            message : result.results.message,
                        };
                    }

                    const autoIncrementId = (
                        (table.autoIncrement == undefined) ?
                        undefined :
                        (row[table.autoIncrement as keyof typeof row] === undefined) ?
                        await squill
                            .selectValue(() => squill.expr(
                                {
                                    mapper : tm.mysql.bigIntSigned(),
                                    usedRef : squill.UsedRefUtil.fromColumnRef({}),
                                    isAggregate : false,
                                },
                                "LAST_INSERT_ID()"
                            ))
                            .fetchValue(nestedConnection) :
                        /**
                         * Emulate MySQL behaviour
                         */
                        BigInt(0)
                    );

                    return {
                        query : { sql, },
                        insertedRowCount : BigInt(result.results.affectedRows) as 1n,
                        autoIncrementId : (
                            autoIncrementId == undefined ?
                            undefined :
                            tm.BigIntUtil.equal(autoIncrementId, BigInt(0)) ?
                            undefined :
                            autoIncrementId
                        ),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    insertIgnoreMany<TableT extends squill.InsertableTable>(
        table: TableT,
        rows: readonly [squill.BuiltInInsertRow<TableT>, ...squill.BuiltInInsertRow<TableT>[]]
    ): Promise<squill.InsertIgnoreManyResult> {
        const sql = insertManySqlString("INSERT IGNORE", table, rows);
        return this.lock(async (rawNestedConnection) : Promise<squill.InsertIgnoreManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertIgnoreManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedRowCount : BigInt(result.results.affectedRows),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    replaceOne<TableT extends squill.InsertableTable & squill.DeletableTable>(
        table: TableT,
        row: squill.BuiltInInsertRow<TableT>
    ): Promise<squill.ReplaceOneResult> {
        const sql = insertOneSqlString("REPLACE", table, row);
        return this.lock((rawNestedConnection) => {
            const nestedConnection = (rawNestedConnection as unknown as Connection);
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected ReplaceOneResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    const autoIncrementId = (
                        (table.autoIncrement == undefined) ?
                        undefined :
                        (row[table.autoIncrement as keyof typeof row] === undefined) ?
                        await squill
                            .selectValue(() => squill.expr(
                                {
                                    mapper : tm.mysql.bigIntSigned(),
                                    usedRef : squill.UsedRefUtil.fromColumnRef({}),
                                    isAggregate : false,
                                },
                                "LAST_INSERT_ID()"
                            ))
                            .fetchValue(nestedConnection) :
                        /**
                         * Emulate MySQL behaviour
                         */
                        BigInt(0)
                    );

                    const replaceOneResult : squill.ReplaceOneResult = {
                        query : { sql, },
                        insertedOrReplacedRowCount : BigInt(1) as 1n,
                        autoIncrementId : (
                            autoIncrementId == undefined ?
                            undefined :
                            tm.BigIntUtil.equal(autoIncrementId, BigInt(0)) ?
                            undefined :
                            autoIncrementId
                        ),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                    return replaceOneResult;
                })
                .catch((err) => {
                    throw err;
                });
        });
    }
    replaceMany<TableT extends squill.InsertableTable & squill.DeletableTable>(
        table: TableT,
        rows : readonly [squill.BuiltInInsertRow<TableT>, ...squill.BuiltInInsertRow<TableT>[]]
    ): Promise<squill.ReplaceManyResult> {
        const sql = insertManySqlString("REPLACE", table, rows);
        return this.lock(async (rawNestedConnection) : Promise<squill.ReplaceManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected ReplaceManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedOrReplacedRowCount : BigInt(rows.length),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    insertSelect<
        QueryT extends squill.QueryBaseUtil.AfterSelectClause & squill.QueryBaseUtil.NonCorrelated,
        TableT extends squill.InsertableTable
    >(
        query: QueryT,
        table: TableT,
        insertSelectRow: squill.InsertSelectRow<QueryT, TableT>
    ): Promise<squill.InsertManyResult> {
        const sql = insertSelectSqlString("INSERT", query, table, insertSelectRow);
        return this.lock(async (rawNestedConnection) : Promise<squill.InsertManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedRowCount : BigInt(result.results.affectedRows),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    insertIgnoreSelect<
        QueryT extends squill.QueryBaseUtil.AfterSelectClause & squill.QueryBaseUtil.NonCorrelated,
        TableT extends squill.InsertableTable
    >(
        query: QueryT,
        table: TableT,
        insertSelectRow: squill.InsertSelectRow<QueryT, TableT>
    ): Promise<squill.InsertIgnoreManyResult> {
        const sql = insertSelectSqlString("INSERT IGNORE", query, table, insertSelectRow);
        return this.lock(async (rawNestedConnection) : Promise<squill.InsertManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected InsertIgnoreManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedRowCount : BigInt(result.results.affectedRows),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    replaceSelect<
        QueryT extends squill.QueryBaseUtil.AfterSelectClause & squill.QueryBaseUtil.NonCorrelated,
        TableT extends squill.InsertableTable
    >(
        query: QueryT,
        table: TableT,
        insertSelectRow: squill.InsertSelectRow<QueryT, TableT>
    ): Promise<squill.ReplaceManyResult> {
        const sql = insertSelectSqlString("REPLACE", query, table, insertSelectRow);
        return this.lock(async (rawNestedConnection) : Promise<squill.ReplaceManyResult> => {
            const nestedConnection = rawNestedConnection as unknown as Connection;
            return nestedConnection.rawQuery(sql)
                .then(async (result) => {
                    //console.log(result);
                    if (!isOkPacket(result.results)) {
                        throw new Error(`Expected ReplaceManyResult`);
                    }

                    const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                    return {
                        query : { sql, },
                        insertedOrReplacedRowCount : BigInt(
                            result.results.affectedRows -
                            result.results.changedRows
                        ),
                        warningCount : BigInt(result.results.warningCount),
                        message : result.results.message,
                    };
                })
                .catch((err) => {
                    //console.error("error encountered", sql);
                    throw err;
                });
        });
    }
    update<TableT extends squill.ITable> (
        table : TableT,
        whereClause : squill.WhereClause,
        assignmentMap : squill.BuiltInAssignmentMap<TableT>
    ) : Promise<squill.UpdateResult> {
        const sql = updateSqlString(table, whereClause, assignmentMap);
        if (sql == undefined) {
            return squill.from(table as any)
                .where(() => whereClause as any)
                .count(this)
                .then((count) => {
                    return {
                        query : {
                            /**
                             * No `UPDATE` statement executed
                             */
                            sql : "",
                        },
                        foundRowCount : count,
                        updatedRowCount : BigInt(0),
                        warningCount : BigInt(0),
                        message : "ok",
                    };
                });
        }

        return this.rawQuery(sql)
            .then(async (result) => {
                //console.log(result);
                if (!isOkPacket(result.results)) {
                    throw new Error(`Expected UpdateResult`);
                }

                const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                return {
                    query : { sql, },
                    foundRowCount : BigInt(result.results.affectedRows),
                    updatedRowCount : BigInt(result.results.changedRows),
                    warningCount : BigInt(result.results.warningCount),
                    message : result.results.message,
                };
            })
            .catch((err) => {
                //console.error("error encountered", sql);
                throw err;
            });
    }
    delete(table: squill.DeletableTable, whereClause: squill.WhereClause): Promise<squill.DeleteResult> {
        const sql = deleteSqlString(table, whereClause);
        return this.rawQuery(sql)
            .then(async (result) => {
                if (!isOkPacket(result.results)) {
                    throw new Error(`Expected DeleteResult`);
                }

                const BigInt = tm.TypeUtil.getBigIntFactoryFunctionOrError();

                return {
                    query : { sql, },
                    deletedRowCount : BigInt(result.results.affectedRows),
                    warningCount : BigInt(result.results.warningCount),
                    message : result.results.message,
                };
            })
            .catch((err) => {
                //console.error("error encountered", sql);
                throw err;
            });
    }
    tryFetchSchemaMeta(schemaAlias: string | undefined): Promise<squill.SchemaMeta | undefined> {
        return tryFetchSchemaMeta(this, schemaAlias);
    }
    tryFetchGeneratedColumnExpression(
        schemaAlias: string | undefined,
        tableAlias: string,
        columnAlias: string
    ): Promise<string | undefined> {
        return tryFetchGeneratedColumnExpression(
            this,
            schemaAlias,
            tableAlias,
            columnAlias
        );
    }
    transaction<ResultT>(
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transaction<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    transaction<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.ITransactionConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.ITransactionConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            return (nestedConnection as unknown as Connection).transactionImpl(
                args.length == 1 ? squill.IsolationLevel.SERIALIZABLE : args[0],
                squill.TransactionAccessMode.READ_WRITE,
                args.length == 1 ? args[0] : args[1]
            );
        });
    }
    readOnlyTransaction<ResultT>(
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransaction<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    readOnlyTransaction<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            return (nestedConnection as unknown as Connection).transactionImpl(
                args.length == 1 ? squill.IsolationLevel.SERIALIZABLE : args[0],
                squill.TransactionAccessMode.READ_ONLY,
                args.length == 1 ? args[0] : args[1]
            );
        });
    }
    isInTransaction(): this is squill.ITransactionConnection {
        return this.sharedConnectionInformation.transactionData != undefined;
    }

    private savepointData : (
        | undefined
        | {
            savepointName : string,
        }
    ) = undefined;
    private savepointImpl<ResultT> (
        callback : squill.LockCallback<squill.ITransactionConnection & squill.ConnectionComponent.InSavepoint, ResultT>
    ) : Promise<ResultT> {
        if (this.sharedConnectionInformation.transactionData == undefined) {
            return Promise.reject(new Error(`Cannot use savepoint outside transaction`));
        }
        if (this.savepointData != undefined) {
            return Promise.reject(new Error(`A savepoint is already in progress`));
        }
        const savepointData = {
            savepointName : `squill_savepoint_${++this.sharedConnectionInformation.savepointId}`,
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
                    return callback(this as squill.ITransactionConnection & squill.ConnectionComponent.InSavepoint);
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
        callback : squill.LockCallback<squill.ITransactionConnection & squill.ConnectionComponent.InSavepoint, ResultT>
    ) : Promise<ResultT> {
        return this.lock(async (nestedConnection) => {
            return (nestedConnection as unknown as Connection).savepointImpl(
                callback
            );
        });
    }

    private deallocatePromise : Promise<void>|undefined = undefined;
    deallocate (): Promise<void> {
        //console.log("deallocating...");
        if (this.deallocatePromise == undefined) {
            this.deallocatePromise = this.asyncQueue.stop()
                .then(
                    () => {
                        //console.log("deallocated");
                        this.connectionImpl.release();
                        /**
                         * @todo Handle sync errors somehow.
                         * Maybe propagate them to `IPool` and have an `onError` handler or something
                         */
                        this.eventEmitters.commit();
                    },
                    (err) => {
                        //console.log("deallocated with error");
                        this.connectionImpl.release();
                        /**
                         * @todo Handle sync errors somehow.
                         * Maybe propagate them to `IPool` and have an `onError` handler or something
                         */
                        this.eventEmitters.commit();
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
