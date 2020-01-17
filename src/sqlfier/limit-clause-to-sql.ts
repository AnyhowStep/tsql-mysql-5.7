import * as tsql from "@tsql/tsql";

export function limitClauseToSql (
    limitClause : tsql.LimitClause,
    _toSql : (ast : tsql.Ast) => string
) : string[] {
    return [
        "LIMIT",
        tsql.escapeValue(limitClause.maxRowCount),
        "OFFSET",
        tsql.escapeValue(limitClause.offset),
    ];
}
