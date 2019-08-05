import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";
import {AfterFromClause} from "../helper-type";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type CrossJoinImpl<
    AliasedTableT extends IAliasedTable,
    FromClauseT extends AfterFromClause["fromClause"]
> = (
    Query<{
        fromClause : FromClauseUtil.CrossJoin<FromClauseT, AliasedTableT>,
    }>
);
export type CrossJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (
    CrossJoinImpl<
        AliasedTableT,
        QueryT["fromClause"]
    >
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
