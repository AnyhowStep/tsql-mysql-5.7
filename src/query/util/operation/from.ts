import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";
import {BeforeFromClause} from "../helper-type";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";

export type From<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable> = (
    Query<{
        fromClause : FromClauseUtil.From<QueryT["fromClause"], AliasedTableT>,
    }>
);
export function from<
    QueryT extends BeforeFromClause,
    AliasedTableT extends IAliasedTable
> (
    query : QueryT,
    aliasedTable : (
        & AliasedTableT
        & AssertValidCurrentJoin<QueryT, AliasedTableT>
    )
) : (
    From<QueryT, AliasedTableT>
) {
    assertValidJoinTarget(query, aliasedTable);

    const result : From<QueryT, AliasedTableT> = new Query({
        fromClause : FromClauseUtil.from(query.fromClause, aliasedTable),
    });
    return result;
}
