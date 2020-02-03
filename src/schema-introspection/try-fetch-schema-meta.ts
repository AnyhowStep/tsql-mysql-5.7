import * as tsql from "@tsql/tsql";
import * as informationSchema from "../information-schema";
import {tryFetchTableMeta} from "./try-fetch-table-meta";

export async function tryFetchSchemaMeta (
    connection : tsql.SelectConnection,
    schemaAlias : string|undefined
) : Promise<tsql.SchemaMeta|undefined> {
    if (schemaAlias == undefined) {
        schemaAlias = await tsql.selectValue(() => tsql.currentDatabase())
            .fetchValue(connection);
    }
    const tableAliases = await tsql.from(informationSchema.TABLES)
        .select(columns => [columns.TABLE_NAME])
        .whereEq(
            columns => columns.TABLE_SCHEMA,
            schemaAlias
        )
        .fetchValueArray(connection);

    const tables : tsql.TableMeta[] = [];

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
