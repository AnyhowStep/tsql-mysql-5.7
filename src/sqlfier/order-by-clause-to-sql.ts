import * as squill from "@squill/squill";
import {sqlfier} from "./sqlfier";

function columnToSql (
    sortExpr : squill.IColumn
) : string {
    if (sortExpr.unaliasedAst == undefined) {
        return [
            squill.escapeIdentifierWithBackticks(sortExpr.tableAlias),
            ".",
            squill.escapeIdentifierWithBackticks(sortExpr.columnAlias)
        ].join("");
    } else {
        return squill.escapeIdentifierWithBackticks(
            `${sortExpr.tableAlias}${squill.SEPARATOR}${sortExpr.columnAlias}`
        );
    }
}

export function orderByClauseToSql (
    orderByClause : squill.OrderByClause,
    selectClause : squill.SelectClause|undefined,
    toSql : (ast : squill.Ast) => string
) : string[] {
    if (orderByClause.length == 0) {
        return [];
    }

    if (selectClause != undefined) {
        const originalToSql = toSql;
        toSql = (ast : squill.Ast) : string => {
            if (squill.Parentheses.IsParentheses(ast) || squill.FunctionCall.IsFunctionCall(ast)) {
                return ast.toSql({
                    ...sqlfier,
                    identifierSqlfier : (identifierNode) : string => {
                        if (identifierNode.identifiers.length != 1) {
                            return sqlfier.identifierSqlfier(identifierNode);
                        }
                        const alias = identifierNode.identifiers[0];
                        const parts = alias.split(squill.SEPARATOR);
                        if (parts.length != 2 || parts[0] != squill.ALIASED) {
                            return sqlfier.identifierSqlfier(identifierNode);
                        }
                        /**
                         * MySQL 5.7 has this weird thing where you cannot use an alias
                         * to an aggregate expression in the `ORDER BY` clause...
                         *
                         * You can, however, copy-paste the aggregate expression itself,
                         * and use that.
                         */
                        const selectItem = selectClause.find((selectItem) : selectItem is squill.IExprSelectItem => (
                            squill.ExprSelectItemUtil.isExprSelectItem(selectItem) &&
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
        if (squill.ColumnUtil.isColumn(sortExpr)) {
            result.push(columnToSql(sortExpr));
        } else if (squill.ExprUtil.isExpr(sortExpr)) {
            if (squill.LiteralValueNodeUtil.isLiteralValueNode(sortExpr.ast)) {
                if (sortExpr.ast.literalValueType == squill.LiteralValueType.BIGINT_SIGNED) {
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
