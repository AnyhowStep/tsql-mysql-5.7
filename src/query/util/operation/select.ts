import {SelectClause, SelectClauseUtil, SelectDelegate} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {IQuery} from "../../query";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type SelectImpl<
    SelectsT extends SelectClause,
    FromClauseT extends IQuery["fromClause"],
    SelectClauseT extends IQuery["selectClause"],
    LimitClauseT extends IQuery["limitClause"],
    UnionClauseT extends IQuery["unionClause"],
    UnionLimitClauseT extends IQuery["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseT,
        selectClause : SelectClauseUtil.Select<SelectClauseT, SelectsT>,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type Select<
    QueryT extends IQuery,
    SelectsT extends SelectClause
> = (
    SelectImpl<
        SelectsT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function select<
    QueryT extends IQuery,
    SelectsT extends SelectClause
> (
    query : QueryT,
    selectDelegate : SelectDelegate<QueryT["fromClause"], QueryT["selectClause"], SelectsT>
) : (
    Select<QueryT, SelectsT>
) {
    const selectClause = SelectClauseUtil.select<
        QueryT["fromClause"],
        QueryT["selectClause"],
        SelectsT
    >(
        query.fromClause,
        query.selectClause,
        selectDelegate
    );

    const {
        fromClause,
        //selectClause,

        limitClause,

        unionClause,
        unionLimitClause,

        whereClause,
        groupByClause,
    } = query;

    const result : Select<QueryT, SelectsT> = new Query(
        {
            fromClause,
            selectClause,

            limitClause,

            unionClause,
            unionLimitClause,
        },
        {
            whereClause,
            groupByClause,
        }
    );
    return result;
}
