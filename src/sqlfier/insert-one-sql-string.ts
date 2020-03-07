import * as squill from "@squill/squill";
import {InsertableTable} from "@squill/squill";
import {sqlfier} from "./sqlfier";

export function insertOneSqlString<
    TableT extends InsertableTable
> (
    insertType : string,
    table : TableT,
    insertRow : squill.BuiltInInsertRow<TableT>
) : string {
    const columnAliases = squill.TableUtil.columnAlias(table)
        .filter(columnAlias => {
            return (insertRow as Record<string, unknown>)[columnAlias] !== undefined;
        })
        .sort();

    const value = columnAliases
        .map(columnAlias => squill.BuiltInExprUtil.buildAst(
            insertRow[columnAlias as unknown as keyof typeof insertRow]
        ))
        .reduce<squill.Ast[]>(
            (values, ast) => {
                if (values.length > 0) {
                    values.push(", ");
                }
                values.push(ast);
                return values;
            },
            [] as squill.Ast[]
        );
    value.unshift("(");
    value.push(")");

    const ast : squill.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(squill.escapeIdentifierWithBackticks).join(", "),
        ") VALUES",
        value,
    ];
    return squill.AstUtil.toSql(ast, sqlfier);
}
