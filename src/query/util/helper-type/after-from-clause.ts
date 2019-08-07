import {QueryBaseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type AfterFromClause = (
    & QueryBaseUtil.AfterFromClause
    & IQuery
);
