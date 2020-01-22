import * as tsql from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function updateSqlString<TableT extends tsql.ITable> (
    table : TableT,
    whereClause : tsql.WhereClause,
    assignmentMap : tsql.BuiltInAssignmentMap<TableT>
) : string|undefined {
    const mutableColumnAlias = Object.keys(assignmentMap)
        .filter(columnAlias => {
            const value = assignmentMap[columnAlias as keyof typeof assignmentMap];
            return (
                value !== undefined &&
                table.mutableColumns.indexOf(columnAlias) >= 0
            );
        })
        .sort();

    if (mutableColumnAlias.length == 0) {
        //Empty assignment list...
        return undefined;
    }

    const assignmentList = mutableColumnAlias.reduce<tsql.Ast[]>(
        (ast, columnAlias) => {
            const value = assignmentMap[columnAlias as keyof typeof assignmentMap];
            const assignment = [
                tsql.escapeIdentifierWithBackticks(columnAlias),
                "=",
                tsql.BuiltInExprUtil.buildAst(value as Exclude<typeof value, undefined>)
            ];

            if (ast.length > 0) {
                ast.push(",");
            }
            ast.push(assignment);
            return ast;
        },
        []
    );

    const ast : tsql.Ast[] = [
        "UPDATE",
        table.unaliasedAst,
        "SET",
        ...assignmentList,
        "WHERE",
        whereClause.ast
    ];
    return tsql.AstUtil.toSql(ast, sqlfier);
}
