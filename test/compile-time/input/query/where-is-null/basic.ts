import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntUnsigned().orNull(),
    });

export const query = tsql.QueryUtil.newInstance()
    .from(myTable)
    .whereIsNull(
        columns => columns.myTableId
    );
