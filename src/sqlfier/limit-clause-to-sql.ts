import * as squill from "@squill/squill";

export function limitClauseToSql (
    limitClause : squill.LimitClause,
    _toSql : (ast : squill.Ast) => string
) : string[] {
    return [
        "LIMIT",
        squill.escapeValue(limitClause.maxRowCount),
        "OFFSET",
        squill.escapeValue(limitClause.offset),
    ];
}
