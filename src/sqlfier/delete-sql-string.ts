import * as tsql from "@tsql/tsql";
import {DeletableTable, WhereClause} from "@tsql/tsql";
import {sqlfier} from "./sqlfier";

export function deleteSqlString (
    table : DeletableTable,
    whereClause : WhereClause
) : string {
    const ast : tsql.Ast[] = [
        "DELETE FROM",
        table.unaliasedAst,
        "WHERE",
        whereClause.ast
    ];
    return tsql.AstUtil.toSql(ast, sqlfier);
}
