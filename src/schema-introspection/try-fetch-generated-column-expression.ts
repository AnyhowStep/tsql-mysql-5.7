import * as squill from "@squill/squill";
import * as informationSchema from "../information-schema";

export function tryFetchGeneratedColumnExpression(
    connection : squill.SelectConnection,
    schemaAlias: string | undefined,
    tableAlias: string,
    columnAlias: string
): Promise<string | undefined> {
    return squill.from(informationSchema.COLUMNS)
        .where(columns => squill.eq(
            columns.TABLE_SCHEMA,
            (
                schemaAlias == undefined ?
                squill.throwIfNull(squill.currentSchema()) :
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
