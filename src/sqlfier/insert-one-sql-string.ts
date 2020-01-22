import * as tsql from "@tsql/tsql";
import {InsertableTable} from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function insertOneSqlString<
    TableT extends InsertableTable
> (
    insertType : string,
    table : TableT,
    insertRow : tsql.BuiltInInsertRow<TableT>
) : string {
    const columnAliases = tsql.TableUtil.columnAlias(table)
        .filter(columnAlias => {
            return (insertRow as Record<string, unknown>)[columnAlias] !== undefined;
        })
        .sort();

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

    const ast : tsql.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(tsql.escapeIdentifierWithBackticks).join(", "),
        ") VALUES",
        value,
    ];
    return tsql.AstUtil.toSql(ast, sqlfier);
}
