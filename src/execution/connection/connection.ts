import * as mysql from "mysql";
import * as tsql from "@tsql/tsql";
import {sqlfier} from "../../sqlfier";

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

export class Connection implements tsql.IConnection {
    readonly pool: tsql.IPool;
    readonly eventEmitters: tsql.IConnectionEventEmitterCollection;

    private readonly asyncQueue : tsql.AsyncQueue<mysql.PoolConnection>;
    private readonly sharedConnectionInformation : SharedConnectionInformation;

    constructor (
        {
            pool,
            eventEmitters,
            connectionImpl,
            sharedConnectionInformation,
        } :
        {
            pool : tsql.IPool,
            eventEmitters : tsql.IConnectionEventEmitterCollection,
            connectionImpl : mysql.PoolConnection|tsql.AsyncQueue<mysql.PoolConnection>,
            sharedConnectionInformation : SharedConnectionInformation,
        }
    ) {
        this.pool = pool;
        this.eventEmitters = eventEmitters;

        this.asyncQueue = connectionImpl instanceof tsql.AsyncQueue ?
            connectionImpl :
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
        throw new Error("Method not implemented.");
    }
    lock<ResultT>(callback: tsql.LockCallback<tsql.IConnection, ResultT>): Promise<ResultT> {
        callback;
        throw new Error("Method not implemented.");
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
        args;
        throw new Error("Method not implemented.");
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
        args;
        throw new Error("Method not implemented.");
    }
    rawQuery(sql: string): Promise<tsql.RawQueryResult> {
        return this.asyncQueue.enqueue<tsql.RawQueryResult>((connectionImpl) => {
            return new Promise<tsql.RawQueryResult>((resolve, reject) => {
                connectionImpl.query(
                    sql,
                    (err, results, rawFieldArr) => {
                        if (err != undefined) {
                            reject(err);
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
    insertOne<TableT extends tsql.ITable<tsql.TableData> & {insertEnabled: true;}>(table: TableT, row: {readonly [columnAlias in Exclude<TableT["columns"] extends tsql.ColumnMap ? Extract<keyof TableT["columns"], string> : never, TableT["generatedColumns"][number] | TableT["nullableColumns"][number] | TableT["explicitDefaultValueColumns"][number] | TableT["autoIncrement"]>]: tsql.BuiltInExpr_NonCorrelated<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;} & {readonly [columnAlias in tsql.TableUtil.OptionalColumnAlias<TableT>]?: tsql.BuiltInExpr_NonCorrelatedOrUndefined<ReturnType<TableT["columns"][columnAlias]["mapper"]>>;}): Promise<tsql.InsertOneResult> {
        table;
        row;
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    isDeallocated(): boolean {
        throw new Error("Method not implemented.");
    }


}
