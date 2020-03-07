import * as squill from "@squill/squill";
import {queryToSql} from "./query-to-sql";

export function compoundQueryClauseToSql (
    compoundQueryClause : squill.CompoundQueryClause,
    toSql : (ast : squill.Ast) => string
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
