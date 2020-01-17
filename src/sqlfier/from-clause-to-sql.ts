import * as tsql from "@tsql/tsql";
import {queryToSql} from "./query-to-sql";

export function fromClauseToSql (
    currentJoins : tsql.FromClauseUtil.AfterFromClause["currentJoins"],
    toSql : (ast : tsql.Ast) => string
) : string[] {
    const result : string[] = [];
    for (const join of currentJoins) {
        if (join.joinType == tsql.JoinType.FROM) {
            result.push("FROM");
        } else {
            result.push(join.joinType, "JOIN");
        }
        if (tsql.isIdentifierNode(join.tableAst)) {
            const lastIdentifier = join.tableAst.identifiers[join.tableAst.identifiers.length-1];
            if (lastIdentifier == join.tableAlias) {
                result.push(toSql(join.tableAst));
            } else {
                result.push(
                    toSql(join.tableAst),
                    "AS",
                    tsql.escapeIdentifierWithBackticks(join.tableAlias)
                );
            }
        } else if (tsql.QueryBaseUtil.isQuery(join.tableAst)) {
            result.push("(", queryToSql(join.tableAst, toSql, true), ")");
            result.push("AS");
            result.push(tsql.escapeIdentifierWithBackticks(join.tableAlias));
        } else {
            result.push("(", toSql(join.tableAst), ")");
            result.push("AS");
            result.push(tsql.escapeIdentifierWithBackticks(join.tableAlias));
        }
        if (join.onClause != undefined) {
            result.push("ON");
            result.push(toSql(tsql.AstUtil.tryUnwrapParentheses(join.onClause.ast)));
        }
    }
    return result;
}
