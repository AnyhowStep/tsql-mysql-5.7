import * as tsql from "@tsql/tsql";
import {queryToSql} from "./query-to-sql";

export function compoundQueryClauseToSql (
    compoundQueryClause : tsql.CompoundQueryClause,
    toSql : (ast : tsql.Ast) => string
) : string[] {
    const result : string[] = [];
    for (const compoundQuery of compoundQueryClause) {
        result.push(compoundQuery.compoundQueryType);
        if (!compoundQuery.isDistinct) {
            result.push("ALL");
        }

        result.push(
            "(",
            queryToSql(
                compoundQuery.query,
                toSql,
                false
            ),
            ")"
        );
    }
    return result;
}
