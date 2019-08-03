import {FromClauseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type AfterFromClause = (
    IQuery<{
        fromClause : FromClauseUtil.AfterFromClause,
    }>
);