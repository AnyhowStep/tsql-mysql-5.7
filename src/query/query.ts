import {
    QueryBaseData,
    WhereClause,
    IQueryBase,
    GroupByClause,
} from "@tsql/tsql";

export interface QueryData extends QueryBaseData {
}
export interface ExtraQueryData {
    readonly whereClause : WhereClause|undefined,
    readonly groupByClause : GroupByClause|undefined,
}
export interface IQuery<DataT extends QueryData=QueryData> extends IQueryBase<DataT> {
    readonly whereClause : WhereClause|undefined,
    readonly groupByClause : GroupByClause|undefined,
}
