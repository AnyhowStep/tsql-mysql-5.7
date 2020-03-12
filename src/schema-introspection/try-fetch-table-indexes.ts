import * as squill from "@squill/squill";
import * as informationSchema from "../information-schema";

export interface MySqlIndex {
    indexName : string;
    isUnique : boolean;
    columns : string[];
    indexType : string;
}

export async function tryFetchTableIndexes (
    connection : squill.SelectConnection,
    schemaAlias : string,
    tableAlias : string
) : Promise<MySqlIndex[]|undefined> {
    const columns = await squill.from(informationSchema.STATISTICS)
        .whereEqColumns(
            tables => tables.STATISTICS,
            {
                TABLE_SCHEMA : schemaAlias,
                TABLE_NAME : tableAlias,
            }
        )
        .orderBy(columns => [
            columns.INDEX_NAME.asc(),
            columns.SEQ_IN_INDEX.asc(),
        ])
        .select(columns => [columns])
        .fetchAll(connection);

    return columns.reduce<MySqlIndex[]>(
        (indexes, column) => {
            if (indexes.length == 0 || indexes[0].indexName != column.INDEX_NAME) {
                indexes.unshift({
                    indexName : column.INDEX_NAME,
                    isUnique : !column.NON_UNIQUE,
                    columns : [column.COLUMN_NAME],
                    indexType : column.INDEX_TYPE,
                });
            } else {
                indexes[0].columns.push(column.COLUMN_NAME);
            }
            return indexes;
        },
        []
    );
}
