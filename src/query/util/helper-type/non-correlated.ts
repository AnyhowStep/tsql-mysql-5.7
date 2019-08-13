import {QueryBaseUtil} from "@tsql/tsql";
import {IQuery} from "../../query";

export type NonCorrelated = (
    & QueryBaseUtil.NonCorrelated
    & IQuery
);
