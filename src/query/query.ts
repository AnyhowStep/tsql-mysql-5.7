import {IFromClause} from "@tsql/tsql";

export interface QueryData {
    readonly fromClause : IFromClause,
}

export interface IQuery<DataT extends QueryData=QueryData> {
    readonly fromClause : DataT["fromClause"],
}
