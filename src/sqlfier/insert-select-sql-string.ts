import * as tsql from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function insertSelectSqlString<
    QueryT extends tsql.QueryBaseUtil.AfterSelectClause,
    TableT extends tsql.InsertableTable
> (
    insertType : string,
    query : QueryT,
    table : TableT,
    insertSelectRow : tsql.InsertSelectRow<QueryT, TableT>
) : string {
    const columnAliases = tsql.TableUtil.columnAlias(table)
        .filter(columnAlias => {
            return (insertSelectRow as Record<string, unknown>)[columnAlias] !== undefined;
        })
        .sort();

    const values = columnAliases
        .map(columnAlias => {
            const value = insertSelectRow[columnAlias as unknown as keyof typeof insertSelectRow];
            if (tsql.ColumnUtil.isColumn(value)) {
                return tsql.escapeIdentifierWithBackticks(
                    `${(value as tsql.IColumn).tableAlias}${tsql.SEPARATOR}${(value as tsql.IColumn).columnAlias}`
                );
            } else {
                return tsql.BuiltInExprUtil.buildAst(
                    value
                );
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

    const ast : tsql.Ast[] = [
        `${insertType} INTO`,
        /**
         * We use the `unaliasedAst` because the user may have called `setSchemaName()`
         */
        table.unaliasedAst,
        "(",
        columnAliases.map(tsql.escapeIdentifierWithBackticks).join(", "),
        ")",
        "SELECT",
        ...values,
        "FROM",
        "(",
        query,
        ") AS tmp"
    ];
    const sql = tsql.AstUtil.toSql(ast, sqlfier);
    return sql;
}
