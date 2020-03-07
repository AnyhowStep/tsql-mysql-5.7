import * as squill from "@squill/squill";

export function whereClauseToSql (
    whereClause : squill.WhereClause,
    toSql : (ast : squill.Ast) => string
) : string[] {
    return [
        "WHERE",
        toSql(squill.AstUtil.tryUnwrapParentheses(whereClause.ast))
    ];
}
