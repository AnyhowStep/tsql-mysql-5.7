import * as tm from "type-mapping";
import {FromClauseUtil, ColumnUtil, PrimitiveExpr} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {AfterFromClause} from "../helper-type";
import { nullSafeEq } from "../../../expr-library";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type WhereNullSafeEqImpl<
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            FromClauseT["currentJoins"]
        >,
        PrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>,
    FromClauseT extends AfterFromClause["fromClause"],
    SelectClauseT extends AfterFromClause["selectClause"],
    LimitClauseT extends AfterFromClause["limitClause"],
    UnionClauseT extends AfterFromClause["unionClause"],
    UnionLimitClauseT extends AfterFromClause["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseUtil.WhereNullSafeEq<FromClauseT, ColumnT, ValueT>,
        selectClause : SelectClauseT,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type WhereNullSafeEq<
    QueryT extends AfterFromClause,
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            QueryT["fromClause"]["currentJoins"]
        >,
        PrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>
> = (
    WhereNullSafeEqImpl<
        ColumnT,
        ValueT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function whereNullSafeEq<
    QueryT extends AfterFromClause,
    ColumnT extends ColumnUtil.ExtractWithType<
        ColumnUtil.FromJoinArray<
            QueryT["fromClause"]["currentJoins"]
        >,
        PrimitiveExpr
    >,
    ValueT extends tm.OutputOf<ColumnT["mapper"]>
> (
    query : QueryT,
    whereNullSafeEqDelegate : FromClauseUtil.WhereNullSafeEqDelegate<
        QueryT["fromClause"],
        ColumnT
    >,
    value : ValueT
) : (
    WhereNullSafeEq<QueryT, ColumnT, ValueT>
) {
    const {
        fromClause,
        whereClause,
    } = FromClauseUtil.whereNullSafeEq<
        QueryT["fromClause"],
        ColumnT,
        ValueT
    >(
        query.fromClause,
        query.whereClause,
        nullSafeEq,
        whereNullSafeEqDelegate,
        value
    );

    const {
        //fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : WhereNullSafeEq<QueryT, ColumnT, ValueT> = new Query(
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
