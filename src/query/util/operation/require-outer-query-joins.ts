import {FromClauseUtil, IAliasedTable} from "@tsql/tsql";
import {IQuery} from "../../query";
import {Query} from "../../query-impl";

export type RequireOuterQueryJoins<
    QueryT extends IQuery,
    AliasedTablesT extends readonly IAliasedTable[]
> = (
    Query<{
        fromClause : FromClauseUtil.RequireOuterQueryJoins<QueryT["fromClause"], AliasedTablesT>,
    }>
);
export function requireOuterQueryJoins<
    QueryT extends IQuery,
    AliasedTablesT extends readonly IAliasedTable[]
> (
    query : QueryT,
    ...aliasedTables : (
        & AliasedTablesT
        & FromClauseUtil.AssertValidOuterQueryJoins<QueryT["fromClause"], AliasedTablesT>
    )
) : (
    RequireOuterQueryJoins<QueryT, AliasedTablesT>
) {
    const result : RequireOuterQueryJoins<QueryT, AliasedTablesT> = new Query({
        fromClause : FromClauseUtil.requireOuterQueryJoins<
            QueryT["fromClause"],
            AliasedTablesT
        >(
            query.fromClause,
            ...(aliasedTables as any)
        ),
    });
    return result;
}
