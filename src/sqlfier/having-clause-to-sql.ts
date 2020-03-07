import * as squill from "@squill/squill";

export function havingClauseToSql (
    havingClause : squill.HavingClause,
    toSql : (ast : squill.Ast) => string
) : string[] {
    return [
        "HAVING",
        toSql(squill.AstUtil.tryUnwrapParentheses(havingClause.ast))
    ];
}
