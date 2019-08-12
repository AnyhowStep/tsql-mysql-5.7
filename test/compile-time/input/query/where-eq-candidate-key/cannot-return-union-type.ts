import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableIdA : tm.mysql.bigIntUnsigned(),
        myTableIdB : tm.mysql.boolean(),
        otherColumn : tm.mysql.varChar(),
    })
    .setPrimaryKey(c => [c.myTableIdA, c.myTableIdB])
    .addCandidateKey(c => [c.myTableIdA, c.otherColumn]);

const myOtherTable = tsql.table("myOtherTable")
    .addColumns({
        myOtherTableIdA : tm.mysql.bigIntUnsigned(),
        myOtherTableIdB : tm.mysql.boolean(),
        otherColumn : tm.mysql.varChar(),
    })
    .setPrimaryKey(c => [c.myOtherTableIdA, c.myOtherTableIdB])
    .addCandidateKey(c => [c.myOtherTableIdA, c.otherColumn]);

export const query = tsql.QueryUtil.newInstance()
    .from(myTable)
    .crossJoin(myOtherTable)
    .whereEqCandidateKey(
        /**
         * It impossible for `WhereEqCandidateKeyDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        tables => Math.random() < 0.5 ? tables.myTable : tables.myOtherTable,
        {
            myTableIdA : 1n,
            myTableIdB : false,
            myOtherTableIdA : 2n,
            myOtherTableIdB : true,
        }
    );
