import {FromClauseUtil} from "@tsql/tsql";
import {Query} from "../../query-impl";

export type NewInstance = Query<{
    fromClause : FromClauseUtil.NewInstance,
}>;
export function newInstance () : NewInstance {
    const result : NewInstance = new Query({
        fromClause : FromClauseUtil.newInstance(),
    });
    return result;
}
