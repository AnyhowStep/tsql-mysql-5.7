import * as squill from "@squill/squill";
import {queryToSql} from "./query-to-sql";

export function fromClauseToSql (
    currentJoins : squill.FromClauseUtil.AfterFromClause["currentJoins"],
    toSql : (ast : squill.Ast) => string
) : string[] {
    const result : string[] = [];
    for (const join of currentJoins) {
        if (join.joinType == squill.JoinType.FROM) {
            result.push("FROM");
        } else {
            result.push(join.joinType, "JOIN");
        }
        if (squill.isIdentifierNode(join.tableAst)) {
            const lastIdentifier = join.tableAst.identifiers[join.tableAst.identifiers.length-1];
            if (lastIdentifier == join.tableAlias) {
                result.push(toSql(join.tableAst));
            } else {
                result.push(
                    toSql(join.tableAst),
                    "AS",
                    squill.escapeIdentifierWithBackticks(join.tableAlias)
                );
            }
        } else if (squill.QueryBaseUtil.isQuery(join.tableAst)) {
            result.push("(", queryToSql(join.tableAst, toSql, true), ")");
            result.push("AS");
            result.push(squill.escapeIdentifierWithBackticks(join.tableAlias));
        } else if (squill.Parentheses.IsParentheses(join.tableAst) && squill.QueryBaseUtil.isQuery(join.tableAst.ast)) {
            const subQuery = join.tableAst.ast;

            result.push("(", queryToSql(subQuery, toSql, true), ")");
            result.push("AS");
            result.push(squill.escapeIdentifierWithBackticks(join.tableAlias));
        } else {
            result.push("(", toSql(join.tableAst), ")");
            result.push("AS");
            result.push(squill.escapeIdentifierWithBackticks(join.tableAlias));
        }
        if (join.onClause != undefined) {
            result.push("ON");
            result.push(toSql(squill.AstUtil.tryUnwrapParentheses(join.onClause.ast)));
        }
    }
    return result;
}
