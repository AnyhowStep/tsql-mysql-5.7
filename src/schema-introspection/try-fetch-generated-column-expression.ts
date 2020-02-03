import * as tsql from "@tsql/tsql";
import * as informationSchema from "../information-schema";

export function tryFetchGeneratedColumnExpression(
    connection : tsql.SelectConnection,
    schemaAlias: string | undefined,
    tableAlias: string,
    columnAlias: string
): Promise<string | undefined> {
    return tsql.from(informationSchema.COLUMNS)
        .where(columns => tsql.eq(
            columns.TABLE_SCHEMA,
            (
                schemaAlias == undefined ?
                tsql.currentDatabase() :
                schemaAlias
            )
        ))
        .whereEqColumns(
            tables => tables.COLUMNS,
            {
                TABLE_NAME : tableAlias,
                COLUMN_NAME : columnAlias,
            }
        )
        .select(columns => [columns.GENERATION_EXPRESSION])
        .fetchValue(connection)
        .orUndefined()
        .then((value) => {
            if (value == undefined || value == "") {
                return undefined;
            } else {
                return value;
            }
        })
}
