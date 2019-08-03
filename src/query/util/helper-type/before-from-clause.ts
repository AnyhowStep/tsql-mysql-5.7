import {FromClauseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type BeforeFromClause = (
    IQuery<{
        fromClause : FromClauseUtil.BeforeFromClause,
    }>
);