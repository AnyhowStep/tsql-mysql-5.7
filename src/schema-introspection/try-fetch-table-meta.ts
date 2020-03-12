import * as squill from "@squill/squill";
import * as informationSchema from "../information-schema";

export interface MySqlColumnMeta {
    columnAlias : string,
    isAutoIncrement : boolean,
    isNullable : boolean,
    /**
     * If `undefined`, there is no explicit default value.
     */
    explicitDefaultValue : string|undefined,
    /**
     * If `undefined`, there is no generation expression.
     */
    generationExpression : string|undefined,

    /**
     * The data type without any modifiers.
     * Like `BIGINT` or `VARCHAR`
     */
    dataType : string,
    /**
     * The data type with modifiers.
     * Like `BIGINT UNSIGNED` or `VARCHAR(32)`
     */
    columnType : string,
}

export interface MySqlTableMeta {
    tableAlias : string,

    columns : readonly MySqlColumnMeta[],
    candidateKeys : readonly squill.CandidateKeyMeta[],

    primaryKey : squill.CandidateKeyMeta|undefined,
}

export async function tryFetchTableMeta (
    connection : squill.SelectConnection,
    schemaAlias : string,
    tableAlias : string
) : Promise<MySqlTableMeta|undefined> {
    const columns = await squill.from(informationSchema.COLUMNS)
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
            return rows.map((row) : MySqlColumnMeta => {
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
                    dataType : row.DATA_TYPE,
                    columnType : row.COLUMN_TYPE,
                };
            });
        });

    const candidateKeys = await squill.from(informationSchema.STATISTICS)
        .whereEqColumns(
            tables => tables.STATISTICS,
            {
                TABLE_SCHEMA : schemaAlias,
                TABLE_NAME : tableAlias,
            }
        )
        .where(columns => squill.not(columns.NON_UNIQUE))
        .select(columns => [
            columns.INDEX_NAME,
            columns.COLUMN_NAME,
        ])
        .orderBy(columns => [
            columns.INDEX_NAME.asc(),
            columns.SEQ_IN_INDEX.asc(),
        ])
        .fetchAll(connection)
        .then((columns) : squill.CandidateKeyMeta[] => {
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
