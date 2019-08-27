import {IAliasedTable, FromClauseUtil, TypeUtil, TableWithPrimaryKey, TableUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";
import {AfterFromClause} from "../helper-type";
import {eqPrimaryKeyOfTable} from "../../../expr-library";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type LeftJoinUsingPrimaryKeyImpl<
    AliasedTableT extends IAliasedTable,
    FromClauseT extends AfterFromClause["fromClause"],
    SelectClauseT extends AfterFromClause["selectClause"],
    LimitClauseT extends AfterFromClause["limitClause"],
    UnionClauseT extends AfterFromClause["unionClause"],
    UnionLimitClauseT extends AfterFromClause["unionLimitClause"],
> =
    Query<{
        fromClause : FromClauseUtil.LeftJoin<FromClauseT, AliasedTableT>,
        selectClause : SelectClauseT,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
;
export type LeftJoinUsingPrimaryKey<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> =
    LeftJoinUsingPrimaryKeyImpl<
        AliasedTableT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
;
export function leftJoinUsingPrimaryKey<
    QueryT extends AfterFromClause,
    SrcT extends QueryT["fromClause"]["currentJoins"][number],
    DstT extends TableWithPrimaryKey
> (
    query : QueryT,
    srcDelegate : FromClauseUtil.LeftJoinUsingPrimaryKeySrcDelegate<QueryT["fromClause"], SrcT>,
    aliasedTable : (
        & DstT
        & TypeUtil.AssertNonUnion<DstT>
        & AssertValidCurrentJoin<QueryT, DstT>
        & TableUtil.AssertHasNullSafeComparablePrimaryKey<DstT, SrcT["columns"]>
    )
) : (
    LeftJoinUsingPrimaryKey<QueryT, DstT>
) {
    assertValidJoinTarget(query, aliasedTable);

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : LeftJoinUsingPrimaryKey<QueryT, DstT> = new Query(
        {
            fromClause : FromClauseUtil.leftJoinUsingPrimaryKey<
                QueryT["fromClause"],
                SrcT,
                DstT
            >(
                query.fromClause,
                eqPrimaryKeyOfTable,
                srcDelegate,
                aliasedTable
            ),
            selectClause,

            limitClause,

            unionClause,
            unionLimitClause,
        },
        query
    );
    return result;
}