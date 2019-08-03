import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntUnsigned(),
    });

const myOtherTable1 = tsql.table("myOtherTable1");
const myOtherTable2 = tsql.table("myOtherTable2");
const myOtherTable3 = tsql.table("myOtherTable3");
const myOtherTable4 = tsql.table("myOtherTable4");
const myOtherTable5 = tsql.table("myOtherTable5");
const myOtherTable6 = tsql.table("myOtherTable6");
const myOtherTable7 = tsql.table("myOtherTable7");
const myOtherTable8 = tsql.table("myOtherTable8");
const myOtherTable9 = tsql.table("myOtherTable9");
const myOtherTable10 = tsql.table("myOtherTable10");

const myOtherTable11 = tsql.table("myOtherTable11");
const myOtherTable12 = tsql.table("myOtherTable12");
const myOtherTable13 = tsql.table("myOtherTable13");
const myOtherTable14 = tsql.table("myOtherTable14");
const myOtherTable15 = tsql.table("myOtherTable15");
const myOtherTable16 = tsql.table("myOtherTable16");
const myOtherTable17 = tsql.table("myOtherTable17");
const myOtherTable18 = tsql.table("myOtherTable18");
const myOtherTable19 = tsql.table("myOtherTable19");
const myOtherTable20 = tsql.table("myOtherTable20");

const myOtherTable21 = tsql.table("myOtherTable21");

export const query = tsql.QueryUtil.newInstance()
    .from(myTable)
    .crossJoin(myOtherTable1)
    .crossJoin(myOtherTable2)
    .crossJoin(myOtherTable3)
    .crossJoin(myOtherTable4)
    .crossJoin(myOtherTable5)
    .crossJoin(myOtherTable6)
    .crossJoin(myOtherTable7)
    .crossJoin(myOtherTable8)
    .crossJoin(myOtherTable9)
    .crossJoin(myOtherTable10)
    .crossJoin(myOtherTable11)
    .crossJoin(myOtherTable12)
    .crossJoin(myOtherTable13)
    .crossJoin(myOtherTable14)
    .crossJoin(myOtherTable15)
    .crossJoin(myOtherTable16)
    .crossJoin(myOtherTable17)
    .crossJoin(myOtherTable18)
    .crossJoin(myOtherTable19)
    .crossJoin(myOtherTable20);

query
    .crossJoin(myOtherTable21);
