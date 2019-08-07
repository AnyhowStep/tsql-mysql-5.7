import {QueryBaseData, WhereClause, IQueryBase} from "@tsql/tsql";

export interface QueryData extends QueryBaseData {
}
export interface ExtraQueryData {
    readonly whereClause : WhereClause|undefined,
}
export interface IQuery<DataT extends QueryData=QueryData> extends IQueryBase<DataT> {
    readonly whereClause : WhereClause|undefined,
}
