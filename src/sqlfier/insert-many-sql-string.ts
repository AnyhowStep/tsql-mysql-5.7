import * as tsql from "@tsql/tsql";
import {InsertableTable} from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function insertManySqlString<
    TableT extends InsertableTable
> (
    insertType : string,
    table : TableT,
    insertRows : readonly [tsql.BuiltInInsertRow<TableT>, ...tsql.BuiltInInsertRow<TableT>[]]
) : string {
    const columnAliases = tsql.TableUtil.columnAlias(table)
        .sort();

    const values = insertRows.reduce(
        (values, insertRow) => {
            const value = columnAliases
                .map(columnAlias => {
                    const v = insertRow[columnAlias as unknown as keyof typeof insertRow];
                    if (v === undefined) {
                        return "DEFAULT";
                    } else {
                        return tsql.BuiltInExprUtil.buildAst(v);
                    }
                })
                .reduce<tsql.Ast[]>(
                    (values, ast) => {
                        if (values.length > 0) {
                            values.push(", ");
                        }
                        values.push(ast);
                        return values;
                    },
                    [] as tsql.Ast[]
                );
            value.unshift("(");
            value.push(")");

            if (values.length > 0) {
                values.push(", ");
            }
            values.push(value);
            return values;
        },
        [] as tsql.Ast[]
    );

    const ast : tsql.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(tsql.escapeIdentifierWithBackticks).join(", "),
        ") VALUES",
        values,
    ];
    return tsql.AstUtil.toSql(ast, sqlfier);
}
