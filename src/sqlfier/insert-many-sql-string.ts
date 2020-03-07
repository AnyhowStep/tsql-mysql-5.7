import * as squill from "@squill/squill";
import {InsertableTable} from "@squill/squill";
import {sqlfier} from "./sqlfier";

export function insertManySqlString<
    TableT extends InsertableTable
> (
    insertType : string,
    table : TableT,
    insertRows : readonly [squill.BuiltInInsertRow<TableT>, ...squill.BuiltInInsertRow<TableT>[]]
) : string {
    const columnAliases = squill.TableUtil.columnAlias(table)
        .sort();

    const values = insertRows.reduce(
        (values, insertRow) => {
            const value = columnAliases
                .map(columnAlias => {
                    const v = insertRow[columnAlias as unknown as keyof typeof insertRow];
                    if (v === undefined) {
                        return "DEFAULT";
                    } else {
                        return squill.BuiltInExprUtil.buildAst(v);
                    }
                })
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

            if (values.length > 0) {
                values.push(", ");
            }
            values.push(value);
            return values;
        },
        [] as squill.Ast[]
    );

    const ast : squill.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(squill.escapeIdentifierWithBackticks).join(", "),
        ") VALUES",
        values,
    ];
    return squill.AstUtil.toSql(ast, sqlfier);
}
