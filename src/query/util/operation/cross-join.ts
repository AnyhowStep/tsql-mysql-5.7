import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";
import {AfterFromClause} from "../helper-type";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";

export type CrossJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (
    Query<{
        fromClause : FromClauseUtil.CrossJoin<QueryT["fromClause"], AliasedTableT>,
    }>
);
export function crossJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> (
    query : QueryT,
    aliasedTable : (
        & AliasedTableT
        & AssertValidCurrentJoin<QueryT, AliasedTableT>
    )
) : (
    CrossJoin<QueryT, AliasedTableT>
) {
    assertValidJoinTarget(query, aliasedTable);

    const result : CrossJoin<QueryT, AliasedTableT> = new Query({
        fromClause : FromClauseUtil.crossJoin(query.fromClause, aliasedTable),
    });
    return result;
}
