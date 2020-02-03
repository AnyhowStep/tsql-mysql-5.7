import * as tsql from "@tsql/tsql";
import * as informationSchema from "../information-schema";

export async function tryFetchTableMeta (
    connection : tsql.SelectConnection,
    schemaAlias : string,
    tableAlias : string
) : Promise<tsql.TableMeta|undefined> {
    const columns = await tsql.from(informationSchema.COLUMNS)
        .whereEqColumns(
            tables => tables.COLUMNS,
            {
                TABLE_SCHEMA : schemaAlias,
                TABLE_NAME : tableAlias,
            }
        )
        .orderBy(columns => [
            columns.ORDINAL_POSITION.asc(),
        ])
        .select(columns => [columns])
        .fetchAll(connection)
        .then((rows) => {
            return rows.map((row) : tsql.ColumnMeta => {
                return {
                    columnAlias : row.COLUMN_NAME,
                    isAutoIncrement : row.EXTRA.includes("auto_increment"),
                    isNullable : (row.IS_NULLABLE == "YES"),
                    explicitDefaultValue : (
                        row.COLUMN_DEFAULT == undefined ?
                        undefined :
                        row.COLUMN_DEFAULT
                    ),
                    generationExpression : (
                        /**
                         * Seems to be an empty string when there is no generation expression
                         */
                        row.GENERATION_EXPRESSION == "" ?
                        undefined :
                        row.GENERATION_EXPRESSION
                    ),
                };
            });
        });

    const candidateKeys = await tsql.from(informationSchema.STATISTICS)
        .whereEqColumns(
            tables => tables.STATISTICS,
            {
                TABLE_SCHEMA : schemaAlias,
                TABLE_NAME : tableAlias,
            }
        )
        .where(columns => tsql.not(columns.NON_UNIQUE))
        .select(columns => [
            columns.INDEX_NAME,
            columns.COLUMN_NAME,
        ])
        .orderBy(columns => [
            columns.INDEX_NAME.asc(),
            columns.SEQ_IN_INDEX.asc(),
        ])
        .fetchAll(connection)
        .then((columns) : tsql.CandidateKeyMeta[] => {
            const result : {
                readonly candidateKeyName : string,
                readonly columnAliases : string[],
            }[] = [];
            for (const column of columns) {
                let index = result.find(
                    index => index.candidateKeyName == column.INDEX_NAME
                );
                if (index == undefined) {
                    index = {
                        candidateKeyName : column.INDEX_NAME,
                        columnAliases : [],
                    };
                    result.push(index);
                }
                index.columnAliases.push(column.COLUMN_NAME);
            }
            return result;
        });

    return {
        tableAlias,
        columns,
        candidateKeys,
        primaryKey : candidateKeys.find(candidateKey => candidateKey.candidateKeyName == "PRIMARY"),
    };
}
