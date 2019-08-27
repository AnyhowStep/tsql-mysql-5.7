import * as tsql from "../../../../../dist";

export const query = tsql.QueryUtil.newInstance()
    .select(() => [
        tsql.and3(true, null).as("and3")
    ])
    .select(() => [
        tsql.eq(true, false).as("eq"),
        tsql.xor(true, true).as("xor")
    ]);
