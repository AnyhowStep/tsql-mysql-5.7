import {GroupByDelegate, GroupByClauseUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {IQuery} from "../../query";
import {AfterFromClause} from "../helper-type";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type GroupByImpl<
    FromClauseT extends IQuery["fromClause"],
    SelectClauseT extends IQuery["selectClause"],
    LimitClauseT extends IQuery["limitClause"],
    UnionClauseT extends IQuery["unionClause"],
    UnionLimitClauseT extends IQuery["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseT,
        selectClause : SelectClauseT,

        limitClause : LimitClauseT,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type GroupBy<
    QueryT extends IQuery
> = (
    GroupByImpl<
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function groupBy<
    QueryT extends AfterFromClause
> (
    query : QueryT,
    groupByDelegate : GroupByDelegate<QueryT["fromClause"], QueryT["selectClause"]>
) : (
    GroupBy<QueryT>
) {
    const groupByClause = GroupByClauseUtil.groupBy<
        QueryT["fromClause"],
        QueryT["selectClause"]
    >(
        query.fromClause,
        query.selectClause,
        query.groupByClause,
        groupByDelegate
    );

    const {
        fromClause,
        selectClause,

        limitClause,

        unionClause,
        unionLimitClause,

        whereClause,
        havingClause,
        orderByClause,
    } = query;

    const result : GroupBy<QueryT> = new Query(
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
            havingClause,
            orderByClause,
        }
    );
    return result;
}
