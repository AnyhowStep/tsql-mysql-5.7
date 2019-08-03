import {FromClauseUtil, IAliasedTable} from "@tsql/tsql";
import {IQuery} from "../../query";
import {Query} from "../../query-impl";

export type RequireNullableOuterQueryJoins<
    QueryT extends IQuery,
    AliasedTablesT extends readonly IAliasedTable[]
> = (
    Query<{
        fromClause : FromClauseUtil.RequireNullableOuterQueryJoins<QueryT["fromClause"], AliasedTablesT>,
    }>
);
export function requireNullableOuterQueryJoins<
    QueryT extends IQuery,
    AliasedTablesT extends readonly IAliasedTable[]
> (
    query : QueryT,
    ...aliasedTables : (
        & AliasedTablesT
        & FromClauseUtil.AssertValidOuterQueryJoins<QueryT["fromClause"], AliasedTablesT>
    )
) : (
    RequireNullableOuterQueryJoins<QueryT, AliasedTablesT>
) {
    const result : RequireNullableOuterQueryJoins<QueryT, AliasedTablesT> = new Query({
        fromClause : FromClauseUtil.requireNullableOuterQueryJoins<
            QueryT["fromClause"],
            AliasedTablesT
        >(
            query.fromClause,
            ...(aliasedTables as any)
        ),
    });
    return result;
}
