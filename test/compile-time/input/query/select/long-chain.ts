import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";

const myTable = tsql.table("myTable")
    .addColumns({
        myTableId : tm.mysql.bigIntUnsigned(),
        myOtherTableId : tm.mysql.bigIntUnsigned(),
    });

const myOtherTable = tsql.table("myOtherTable")
    .addColumns({
        myOtherTableId : tm.mysql.bigIntUnsigned(),
    })
    .setPrimaryKey(columns => [columns.myOtherTableId]);

export const query = tsql.QueryUtil.newInstance()
    .from(myTable)
    .leftJoinUsingPrimaryKey(
        tables => tables.myTable,
        myOtherTable
    )
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq2")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq3")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq4")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq5")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq6")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq7")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq8")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq9")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq10")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq11")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq12")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq13")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq14")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq15")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq16")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq17")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq18")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq19")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq20")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq21")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq22")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq23")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq24")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq25")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq26")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq27")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq28")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq29")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq30")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq31")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq32")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq33")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq34")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq35")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq36")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq37")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq38")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq39")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq40")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq41")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq42")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq43")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq44")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq45")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq46")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq47")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq48")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq49")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq50")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq51")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq52")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq53")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq54")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq55")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq56")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq57")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq58")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq59")
    ])
    .select(columns => [
        tsql.nullSafeEq(
            columns.myOtherTable.myOtherTableId,
            columns.myTable.myOtherTableId
        ).as("nullSafeEq60")
    ]);
