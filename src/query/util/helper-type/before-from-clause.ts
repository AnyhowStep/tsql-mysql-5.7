import {QueryBaseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type BeforeFromClause = (
    & QueryBaseUtil.BeforeFromClause
    & IQuery
);
