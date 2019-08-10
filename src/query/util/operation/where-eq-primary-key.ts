import {FromClauseUtil, PrimaryKey, TypeUtil, JoinArrayUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {AfterFromClause} from "../helper-type";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type WhereEqPrimaryKeyImpl<
    FromClauseT extends AfterFromClause["fromClause"],
    SelectClauseT extends AfterFromClause["selectClause"],
    LimitClauseT extends AfterFromClause["limitClause"],
    UnionClauseT extends AfterFromClause["unionClause"],
    UnionLimitClauseT extends AfterFromClause["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseT,
        selectClause : SelectClauseT,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type WhereEqPrimaryKey<
    QueryT extends AfterFromClause
> = (
    WhereEqPrimaryKeyImpl<
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function whereEqPrimaryKey<
    QueryT extends AfterFromClause,
    TableT extends JoinArrayUtil.ExtractWithPrimaryKey<QueryT["fromClause"]["currentJoins"]>
> (
    query : QueryT,
    whereEqPrimaryKeyDelegate : FromClauseUtil.WhereEqPrimaryKeyDelegate<QueryT["fromClause"], TableT>,
    primaryKey : TypeUtil.UnionToIntersection<PrimaryKey<TableT>>
) : (
    WhereEqPrimaryKey<QueryT>
) {
    const {
        fromClause,
        whereClause,
    } = FromClauseUtil.whereEqPrimaryKey<
        QueryT["fromClause"],
        TableT
    >(
        query.fromClause,
        query.whereClause,
        whereEqPrimaryKeyDelegate,
        primaryKey
    );

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : WhereEqPrimaryKey<QueryT> = new Query(
        {
            fromClause,
            selectClause,

            limitClause,

            unionClause,
            unionLimitClause,
        },
        {
            whereClause,
        }
    );
    return result;
}
