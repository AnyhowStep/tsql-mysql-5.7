import * as squill from "@squill/squill";

export function groupByClauseToSql (
    groupByClause : squill.GroupByClause,
    _toSql : (ast : squill.Ast) => string
) : string[] {
    if (groupByClause.length == 0) {
        return [];
    }

    const result : string[] = [];
    for (const column of groupByClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (column.tableAlias == squill.ALIASED) {
            result.push(
                squill.escapeIdentifierWithBackticks(
                    `${column.tableAlias}${squill.SEPARATOR}${column.columnAlias}`
                )
            );
        } else {
            result.push(
                [
                    squill.escapeIdentifierWithBackticks(column.tableAlias),
                    ".",
                    squill.escapeIdentifierWithBackticks(column.columnAlias)
                ].join("")
            );
        }
    }
    return [
        "GROUP BY",
        ...result
    ];
}
