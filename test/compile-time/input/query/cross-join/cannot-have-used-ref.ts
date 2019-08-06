import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntUnsigned(),
    });

declare const myDerivedTable : tsql.DerivedTable<{
    isLateral : false,
    tableAlias : "myDerivedTable",
    columns : {
    },
    usedRef : tsql.IUsedRef<{
        outerQueryTable : {
            outerQueryColumn : string,
        }
    }>,
}>;
tsql.QueryUtil.newInstance()
    .from(myTable)
    .crossJoin(
        myDerivedTable
    );
