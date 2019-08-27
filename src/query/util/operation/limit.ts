import {LimitClauseUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {IQuery} from "../../query";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type LimitImpl<
    MaxRowCountT extends bigint,
    FromClauseT extends IQuery["fromClause"],
    SelectClauseT extends IQuery["selectClause"],
    LimitClauseT extends IQuery["limitClause"],
    UnionClauseT extends IQuery["unionClause"],
    UnionLimitClauseT extends IQuery["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseT,
        selectClause : SelectClauseT,

        limitClause : LimitClauseUtil.Limit<
            LimitClauseT,
            MaxRowCountT
        >,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type Limit<
    QueryT extends IQuery,
    MaxRowCountT extends bigint
> = (
    LimitImpl<
        MaxRowCountT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function limit<
    QueryT extends IQuery,
    MaxRowCountT extends bigint
> (
    query : QueryT,
    maxRowCount : MaxRowCountT
) : (
    Limit<QueryT, MaxRowCountT>
) {
    const limitClause = LimitClauseUtil.limit<
        QueryT["limitClause"],
        MaxRowCountT
    >(
        query.limitClause,
        maxRowCount
    );

    const {
        fromClause,
        selectClause,

        //limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : Limit<QueryT, MaxRowCountT> = new Query(
        {
            fromClause,
            selectClause,

            limitClause,

            unionClause,
            unionLimitClause,
        },
        query
    );
    return result;
}
