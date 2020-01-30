import * as tsql from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

function columnToSql (
    sortExpr : tsql.IColumn
) : string {
    if (sortExpr.unaliasedAst == undefined) {
        return [
            tsql.escapeIdentifierWithBackticks(sortExpr.tableAlias),
            ".",
            tsql.escapeIdentifierWithBackticks(sortExpr.columnAlias)
        ].join("");
    } else {
        return tsql.escapeIdentifierWithBackticks(
            `${sortExpr.tableAlias}${tsql.SEPARATOR}${sortExpr.columnAlias}`
        );
    }
}

export function orderByClauseToSql (
    orderByClause : tsql.OrderByClause,
    selectClause : tsql.SelectClause|undefined,
    toSql : (ast : tsql.Ast) => string
) : string[] {
    if (orderByClause.length == 0) {
        return [];
    }

    if (selectClause != undefined) {
        const originalToSql = toSql;
        toSql = (ast : tsql.Ast) : string => {
            if (tsql.Parentheses.IsParentheses(ast) || tsql.FunctionCall.IsFunctionCall(ast)) {
                return ast.toSql({
                    ...sqlfier,
                    identifierSqlfier : (identifierNode) : string => {
                        if (identifierNode.identifiers.length != 1) {
                            return sqlfier.identifierSqlfier(identifierNode);
                        }
                        const alias = identifierNode.identifiers[0];
                        const parts = alias.split(tsql.SEPARATOR);
                        if (parts.length != 2 || parts[0] != tsql.ALIASED) {
                            return sqlfier.identifierSqlfier(identifierNode);
                        }
                        /**
                         * MySQL 5.7 has this weird thing where you cannot use an alias
                         * to an aggregate expression in the `ORDER BY` clause...
                         *
                         * You can, however, copy-paste the aggregate expression itself,
                         * and use that.
                         */
                        const selectItem = selectClause.find((selectItem) : selectItem is tsql.IExprSelectItem => (
                            tsql.ExprSelectItemUtil.isExprSelectItem(selectItem) &&
                            /**
                             * We only care about re-writing for **aggregate** expressions from the `SELECT` clause
                             */
                            selectItem.isAggregate &&
                            selectItem.tableAlias == parts[0] &&
                            selectItem.alias == parts[1]
                        ));
                        if (selectItem == undefined) {
                            return sqlfier.identifierSqlfier(identifierNode);
                        }
                        return originalToSql(selectItem.unaliasedAst);
                    },
                });
            }

            return originalToSql(ast);
        };
    }

    const result : string[] = [];
    for (const [sortExpr, sortDirection] of orderByClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (tsql.ColumnUtil.isColumn(sortExpr)) {
            result.push(columnToSql(sortExpr));
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
