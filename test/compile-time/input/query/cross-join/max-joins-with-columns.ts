import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntUnsigned(),
    });

const myOtherTable1 = tsql.table("myOtherTable1").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable2 = tsql.table("myOtherTable2").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable3 = tsql.table("myOtherTable3").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable4 = tsql.table("myOtherTable4").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable5 = tsql.table("myOtherTable5").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable6 = tsql.table("myOtherTable6").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable7 = tsql.table("myOtherTable7").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable8 = tsql.table("myOtherTable8").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable9 = tsql.table("myOtherTable9").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable10 = tsql.table("myOtherTable10").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });

const myOtherTable11 = tsql.table("myOtherTable11").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable12 = tsql.table("myOtherTable12").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable13 = tsql.table("myOtherTable13").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable14 = tsql.table("myOtherTable14").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable15 = tsql.table("myOtherTable15").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable16 = tsql.table("myOtherTable16").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable17 = tsql.table("myOtherTable17").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable18 = tsql.table("myOtherTable18").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable19 = tsql.table("myOtherTable19").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });
const myOtherTable20 = tsql.table("myOtherTable20").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });

const myOtherTable21 = tsql.table("myOtherTable21").addColumns({ x : tm.mysql.bigIntUnsigned(), y : tm.mysql.varChar(255), z : tm.mysql.boolean() });

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
