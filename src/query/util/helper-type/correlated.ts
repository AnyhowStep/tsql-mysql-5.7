import {QueryBaseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type Correlated = (
    & QueryBaseUtil.Correlated
    & IQuery
);
