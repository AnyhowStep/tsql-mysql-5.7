import {LimitClauseUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";
import {IQuery} from "../../query";

/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-518347966
 *
 * This hack should only really be reserved for types that are more likely
 * to trigger max depth/max count errors.
 */
export type OffsetImpl<
    OffsetT extends bigint,
    FromClauseT extends IQuery["fromClause"],
    SelectClauseT extends IQuery["selectClause"],
    LimitClauseT extends IQuery["limitClause"],
    UnionClauseT extends IQuery["unionClause"],
    UnionLimitClauseT extends IQuery["unionLimitClause"],
> = (
    Query<{
        fromClause : FromClauseT,
        selectClause : SelectClauseT,

        limitClause : LimitClauseUtil.Offset<
            LimitClauseT,
            OffsetT
        >,

        unionClause : UnionClauseT,
        unionLimitClause : UnionLimitClauseT,
    }>
);
export type Offset<
    QueryT extends IQuery,
    OffsetT extends bigint
> = (
    OffsetImpl<
        OffsetT,
        QueryT["fromClause"],
        QueryT["selectClause"],
        QueryT["limitClause"],
        QueryT["unionClause"],
        QueryT["unionLimitClause"]
    >
);
export function offset<
    QueryT extends IQuery,
    OffsetT extends bigint
> (
    query : QueryT,
    offset : OffsetT
) : (
    Offset<QueryT, OffsetT>
) {
    const limitClause = LimitClauseUtil.offset<
        QueryT["limitClause"],
        OffsetT
    >(
        query.limitClause,
        offset
    );

    const {
        fromClause,
        selectClause,

        //limitClause,

        unionClause,
        unionLimitClause,
    } = query;

    const result : Offset<QueryT, OffsetT> = new Query(
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
