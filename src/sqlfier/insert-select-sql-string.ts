import * as squill from "@squill/squill";
import {sqlfier} from "./sqlfier";

export function insertSelectSqlString<
    QueryT extends squill.QueryBaseUtil.AfterSelectClause,
    TableT extends squill.InsertableTable
> (
    insertType : string,
    query : QueryT,
    table : TableT,
    insertSelectRow : squill.InsertSelectRow<QueryT, TableT>
) : string {
    const columnAliases = squill.TableUtil.columnAlias(table)
        .filter(columnAlias => {
            return (insertSelectRow as Record<string, unknown>)[columnAlias] !== undefined;
        })
        .sort();

    const values = columnAliases
        .map(columnAlias => {
            const value = insertSelectRow[columnAlias as unknown as keyof typeof insertSelectRow];
            if (squill.ColumnUtil.isColumn(value)) {
                return squill.escapeIdentifierWithBackticks(
                    `${(value as squill.IColumn).tableAlias}${squill.SEPARATOR}${(value as squill.IColumn).columnAlias}`
                );
            } else {
                return squill.BuiltInExprUtil.buildAst(
                    value
                );
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

    const ast : squill.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(squill.escapeIdentifierWithBackticks).join(", "),
        ")",
        "SELECT",
        ...values,
        "FROM",
        "(",
        query,
        ") AS tmp"
    ];
    const sql = squill.AstUtil.toSql(ast, sqlfier);
    return sql;
}
