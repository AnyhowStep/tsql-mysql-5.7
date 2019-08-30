import {QueryBaseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type BeforeUnionClause = (
    & QueryBaseUtil.BeforeUnionClause
    & IQuery
);
