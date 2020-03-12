import * as squill from "@squill/squill";
import * as informationSchema from "../information-schema";
import {tryFetchTableMeta, MySqlTableMeta} from "./try-fetch-table-meta";

export interface MySqlSchemaMeta {
    schemaAlias : string,

    tables : readonly MySqlTableMeta[],
}

export async function tryFetchSchemaMeta (
    connection : squill.SelectConnection,
    schemaAlias : string|undefined
) : Promise<MySqlSchemaMeta|undefined> {
    if (schemaAlias == undefined) {
        schemaAlias = await squill.selectValue(() => squill.throwIfNull(squill.currentSchema()))
            .fetchValue(connection);
    }
    const tableAliases = await squill.from(informationSchema.TABLES)
        .select(columns => [columns.TABLE_NAME])
        .whereEq(
            columns => columns.TABLE_SCHEMA,
            schemaAlias
        )
        .fetchValueArray(connection);

    const tables : MySqlTableMeta[] = [];

    for (const tableAlias of tableAliases) {
        const tableMeta = await tryFetchTableMeta(
            connection,
            schemaAlias,
            tableAlias
        );
        if (tableMeta == undefined) {
            continue;
        }
        tables.push(tableMeta);
    }

    return {
        schemaAlias,
        tables,
    };
}
