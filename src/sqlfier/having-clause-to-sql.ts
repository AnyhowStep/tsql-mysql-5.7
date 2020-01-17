import * as tsql from "@tsql/tsql";

export function havingClauseToSql (
    havingClause : tsql.HavingClause,
    toSql : (ast : tsql.Ast) => string
) : string[] {
    return [
        "HAVING",
        toSql(tsql.AstUtil.tryUnwrapParentheses(havingClause.ast))
    ];
}
