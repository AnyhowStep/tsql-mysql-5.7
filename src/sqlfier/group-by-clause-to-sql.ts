import * as tsql from "@tsql/tsql";

export function groupByClauseToSql (
    groupByClause : tsql.GroupByClause,
    _toSql : (ast : tsql.Ast) => string
) : string[] {
    const result : string[] = [];
    for (const column of groupByClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (column.tableAlias == tsql.ALIASED) {
            result.push(
                tsql.escapeIdentifierWithBackticks(
                    `${column.tableAlias}${tsql.SEPARATOR}${column.columnAlias}`
                )
            );
        } else {
            result.push(
                [
                    tsql.escapeIdentifierWithBackticks(column.tableAlias),
                    ".",
                    tsql.escapeIdentifierWithBackticks(column.columnAlias)
                ].join("")
            );
        }
    }
    return [
        "GROUP BY",
        ...result
    ];
}
