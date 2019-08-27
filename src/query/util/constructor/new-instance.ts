import {FromClauseUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";

export type NewInstance = Query<{
    fromClause : FromClauseUtil.NewInstance,
    selectClause : undefined,

    limitClause : undefined,

    unionClause : undefined,
    unionLimitClause : undefined,
}>;
export function newInstance () : NewInstance {
    const result : NewInstance = new Query(
        {
            fromClause : FromClauseUtil.newInstance(),
            selectClause : undefined,

            limitClause : undefined,

            unionClause : undefined,
            unionLimitClause : undefined,
        },
        {
            whereClause : undefined,
            groupByClause : undefined,
        }
    );
    return result;
}
