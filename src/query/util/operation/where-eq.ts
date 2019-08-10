import * as tm from "type-mapping";
import {FromClauseUtil, ColumnUtil, NonNullPrimitiveExpr} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {AfterFromClause} from "../helper-type";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type WhereEqImpl<
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            FromClauseT["currentJoins"]
        >,
        NonNullPrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>,
    FromClauseT extends AfterFromClause["fromClause"],
    SelectClauseT extends AfterFromClause["selectClause"],
    LimitClauseT extends AfterFromClause["limitClause"],
    UnionClauseT extends AfterFromClause["unionClause"],
    UnionLimitClauseT extends AfterFromClause["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseUtil.WhereEq<FromClauseT, ColumnT, ValueT>,
        selectClause : SelectClauseT,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type WhereEq<
    QueryT extends AfterFromClause,
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            QueryT["fromClause"]["currentJoins"]
        >,
        NonNullPrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>
> = (
    WhereEqImpl<
        ColumnT,
        ValueT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function whereEq<
    QueryT extends AfterFromClause,
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            QueryT["fromClause"]["currentJoins"]
        >,
        NonNullPrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>
> (
    query : QueryT,
    whereEqDelegate : FromClauseUtil.WhereEqDelegate<
        QueryT["fromClause"],
        ColumnT
    >,
    value : ValueT
) : (
    WhereEq<QueryT, ColumnT, ValueT>
) {
    const {
        fromClause,
        whereClause,
    } = FromClauseUtil.whereEq<
        QueryT["fromClause"],
        ColumnT,
        ValueT
    >(
        query.fromClause,
        query.whereClause,
        whereEqDelegate,
        value
    );

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : WhereEq<QueryT, ColumnT, ValueT> = new Query(
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
