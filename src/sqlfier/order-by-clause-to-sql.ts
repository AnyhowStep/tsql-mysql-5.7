import * as tsql from "@tsql/tsql";

export function orderByClauseToSql (
    orderByClause : tsql.OrderByClause,
    toSql : (ast : tsql.Ast) => string
) : string[] {
    if (orderByClause.length == 0) {
        return [];
    }
    const result : string[] = [];
    for (const [sortExpr, sortDirection] of orderByClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (tsql.ColumnUtil.isColumn(sortExpr)) {
            if (sortExpr.unaliasedAst == undefined) {
                result.push(
                    [
                        tsql.escapeIdentifierWithBackticks(sortExpr.tableAlias),
                        ".",
                        tsql.escapeIdentifierWithBackticks(sortExpr.columnAlias)
                    ].join("")
                );
            } else {
                result.push(
                    tsql.escapeIdentifierWithBackticks(
                        `${sortExpr.tableAlias}${tsql.SEPARATOR}${sortExpr.columnAlias}`
                    )
                );
            }
        } else if (tsql.ExprUtil.isExpr(sortExpr)) {
            if (tsql.LiteralValueNodeUtil.isLiteralValueNode(sortExpr.ast)) {
                if (sortExpr.ast.literalValueType == tsql.LiteralValueType.BIGINT_SIGNED) {
                    result.push(toSql([sortExpr.ast, "+ 0"]));
                } else {
                    result.push(toSql(sortExpr.ast));
                }
            } else {
                result.push(toSql(sortExpr.ast));
            }
        } else {
            result.push(toSql(sortExpr.unaliasedAst));
        }
        result.push(sortDirection);
    }
    return [
        "ORDER BY",
        ...result
    ];
}
