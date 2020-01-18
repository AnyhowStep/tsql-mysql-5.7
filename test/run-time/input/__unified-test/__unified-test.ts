import * as tape from "tape";
import * as tsql from "@tsql/tsql";
import {unifiedTest, UnifiedSchema} from "@tsql/tsql/unified-test";
import * as mysql from "../../../../dist";

unifiedTest({
    pool : new mysql.Pool({
        host      : "localhost",
        database  : "typed-orm-test",
        user      : "typed-orm-test-admin",
        password  : "BARyJg48ItnwkjJy",
        charset   : mysql.CharSet.utf8mb4,
    }),
    tape,
    createTemporarySchema : async (
        connection : tsql.IConnection,
        schema : UnifiedSchema
    ) : Promise<void> => {
        for (const table of schema.tables) {
            const tableSql : string[] = [
                `CREATE TEMPORARY TABLE ${tsql.escapeIdentifierWithBackticks(table.tableAlias)} (`
            ];

            let firstColumn = true;
            for (const column of table.columns) {
                const columnSql : string[] = [tsql.escapeIdentifierWithBackticks(column.columnAlias)];

                switch (column.dataType.typeHint) {
                    case tsql.TypeHint.BIGINT_SIGNED: {
                        columnSql.push("BIGINT SIGNED");
                        break;
                    }
                    case tsql.TypeHint.BOOLEAN: {
                        columnSql.push("BOOLEAN");
                        break;
                    }
                    case tsql.TypeHint.BUFFER: {
                        columnSql.push("VARBINARY(256)");
                        break;
                    }
                    case tsql.TypeHint.DATE_TIME: {
                        columnSql.push("DATETIME(3)");
                        break;
                    }
                    case tsql.TypeHint.DECIMAL: {
                        columnSql.push(`DECIMAL(${column.dataType.precision}, ${column.dataType.scale})`);
                        break;
                    }
                    case tsql.TypeHint.DOUBLE: {
                        columnSql.push("DOUBLE");
                        break;
                    }
                    case tsql.TypeHint.STRING: {
                        columnSql.push("VARCHAR(256)");
                        break;
                    }
                }

                if (column.nullable !== true) {
                    columnSql.push("NOT NULL");
                }

                if (
                    table.primaryKey != undefined &&
                    !table.primaryKey.multiColumn &&
                    table.primaryKey.columnAlias == column.columnAlias
                ) {
                    if (table.primaryKey.autoIncrement) {
                        columnSql.push("PRIMARY KEY AUTO_INCREMENT");
                    } else {
                        columnSql.push("PRIMARY KEY");
                    }
                }

                if (column.default != undefined) {
                    columnSql.push("DEFAULT");
                    columnSql.push(tsql.AstUtil.toSql(
                        tsql.BuiltInExprUtil.buildAst(column.default),
                        mysql.sqlfier
                    ));
                }

                if (!firstColumn) {
                    tableSql.push(", ");
                }
                firstColumn = false;
                tableSql.push(columnSql.join(" "));
            }

            if (
                table.primaryKey != undefined &&
                table.primaryKey.multiColumn
            ) {
                const columnAliases = table.primaryKey.columnAliases
                    .map(columnAlias => {
                        return tsql.escapeIdentifierWithBackticks(columnAlias);
                    })
                    .join(", ");
                tableSql.push(`, PRIMARY KEY (${columnAliases})`);
            }

            tableSql.push(");");

            await connection.rawQuery(`DROP TEMPORARY TABLE IF EXISTS ${tsql.escapeIdentifierWithBackticks(table.tableAlias)};`);
            await connection.rawQuery(tableSql.join(" "));
        }
    },
    fileNameLike : process.env.FILE_NAME_LIKE,
});
