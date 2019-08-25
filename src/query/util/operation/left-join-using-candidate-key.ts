import {IAliasedTable, FromClauseUtil, TypeUtil, TableUtil, ITable, EqCandidateKeyOfTableDelegate} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {assertValidJoinTarget, AssertValidCurrentJoin} from "../predicate";
import {AfterFromClause} from "../helper-type";
import {eqCandidateKeyOfTable} from "../../../expr-library";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type LeftJoinUsingCandidateKeyImpl<
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
export type LeftJoinUsingCandidateKey<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> =
    LeftJoinUsingCandidateKeyImpl<
        AliasedTableT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
;
export function leftJoinUsingCandidateKey<
    QueryT extends AfterFromClause,
    SrcT extends QueryT["fromClause"]["currentJoins"][number],
    DstT extends ITable,
    SrcColumnsT extends TableUtil.ColumnArraysFromCandidateKeys<SrcT, DstT>
> (
    query : QueryT,
    srcDelegate : FromClauseUtil.LeftJoinUsingCandidateKeySrcDelegate<QueryT["fromClause"], SrcT>,
    aliasedTable : (
        & DstT
        & TypeUtil.AssertNonUnion<DstT>
        & AssertValidCurrentJoin<QueryT, DstT>
    ),
    eqCandidateKeyofTableDelegate : EqCandidateKeyOfTableDelegate<SrcT, DstT, SrcColumnsT>
) : (
    LeftJoinUsingCandidateKey<QueryT, DstT>
) {
    assertValidJoinTarget(query, aliasedTable);

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : LeftJoinUsingCandidateKey<QueryT, DstT> = new Query(
        {
            fromClause : FromClauseUtil.leftJoinUsingCandidateKey<
                QueryT["fromClause"],
                SrcT,
                DstT,
                SrcColumnsT
            >(
                query.fromClause,
                eqCandidateKeyOfTable,
                srcDelegate,
                aliasedTable,
                eqCandidateKeyofTableDelegate
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
