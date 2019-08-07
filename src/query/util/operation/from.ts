import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";
import {BeforeFromClause} from "../helper-type";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";

export type From<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable> = (
    Query<{
        fromClause : FromClauseUtil.From<QueryT["fromClause"], AliasedTableT>,
        selectClause : QueryT["selectClause"],

        limitClause : QueryT["limitClause"],

        unionClause : QueryT["unionClause"],
        unionLimitClause : QueryT["unionLimitClause"],
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

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : From<QueryT, AliasedTableT> = new Query(
        {
            fromClause : FromClauseUtil.from(query.fromClause, aliasedTable),
            selectClause,

            limitClause,

            unionClause,
            unionLimitClause,
        },
        query
    );
    return result;
}
