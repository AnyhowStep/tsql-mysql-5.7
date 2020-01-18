import * as tsql from "@tsql/tsql";
import {InsertableTable} from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function insertManySqlString<
    TableT extends InsertableTable
> (
    table : TableT,
    insertRows : readonly [tsql.BuiltInInsertRow<TableT>, ...tsql.BuiltInInsertRow<TableT>[]],
    modifier : string
) : string {
    const columnAliases = tsql.TableUtil.columnAlias(table)
        .sort();

    const values = insertRows.reduce(
        (values, insertRow) => {
            const value = columnAliases
                .map(columnAlias => tsql.BuiltInExprUtil.buildAst(
                    insertRow[columnAlias as unknown as keyof typeof insertRow]
                ))
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
        `INSERT ${modifier} INTO`,
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
