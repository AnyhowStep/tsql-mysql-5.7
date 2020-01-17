import * as tsql from "@tsql/tsql";

export function whereClauseToSql (
    whereClause : tsql.WhereClause,
    toSql : (ast : tsql.Ast) => string
) : string[] {
    return [
        "WHERE",
        toSql(tsql.AstUtil.tryUnwrapParentheses(whereClause.ast))
    ];
}
