import * as tsql from "@tsql/tsql";
import {selectClauseToSql} from "./select-clause-to-sql";
import {fromClauseToSql} from "./from-clause-to-sql";
import {whereClauseToSql} from "./where-clause-to-sql";
import {groupByClauseToSql} from "./group-by-clause-to-sql";
import {havingClauseToSql} from "./having-clause-to-sql";
import {orderByClauseToSql} from "./order-by-clause-to-sql";
import {limitClauseToSql} from "./limit-clause-to-sql";
import {compoundQueryClauseToSql} from "./compound-query-clause-to-sql";

export function nonCompoundQueryToSql (
    query : (
        & tsql.IQueryBase
        & {
            readonly compoundQueryClause : undefined;

            readonly compoundQueryLimitClause : undefined;
            readonly compoundQueryOrderByClause : undefined;
        }
    ),
    toSql : (ast : tsql.Ast) => string,
    isDerivedTable : boolean
) : string {
    const result : string[] = [];
    if (query.selectClause != undefined) {
        result.push(
            selectClauseToSql(query.selectClause, toSql, isDerivedTable, query.isDistinct)
            .join(" ")
        );
    }
    if (query.fromClause != undefined && query.fromClause.currentJoins != undefined) {
        result.push(fromClauseToSql(query.fromClause.currentJoins, toSql).join(" "));
    }

    if (query.whereClause != undefined) {
        result.push(whereClauseToSql(query.whereClause, toSql).join(" "));
    }

    if (query.groupByClause != undefined) {
        result.push(groupByClauseToSql(query.groupByClause, toSql).join(" "));
    }

    if (query.havingClause != undefined) {
        result.push(havingClauseToSql(query.havingClause, toSql).join(" "));
    }

    if (query.orderByClause != undefined) {
        result.push(orderByClauseToSql(query.orderByClause, query.selectClause, toSql).join(" "));
    }

    if (query.limitClause != undefined) {
        result.push(limitClauseToSql(query.limitClause, toSql).join(" "));
    }

    return result.join(" ");
}
/**
 * @todo More complicated processing
 */
export function queryToSql (
    query : tsql.IQueryBase,
    toSql : (ast : tsql.Ast) => string,
    isDerivedTable : boolean
) {
    if (
        query.compoundQueryClause == undefined &&
        query.compoundQueryLimitClause == undefined &&
        query.compoundQueryOrderByClause == undefined
    ) {
        return nonCompoundQueryToSql(
            {
                ...query,
                compoundQueryClause : query.compoundQueryClause,
                compoundQueryLimitClause : query.compoundQueryLimitClause,
                compoundQueryOrderByClause : query.compoundQueryOrderByClause,
            },
            toSql,
            isDerivedTable
        );
    }

    const result : string[] = [];

    result.push(
        "(",
        nonCompoundQueryToSql(
            {
                ...query,
                compoundQueryClause : undefined,
                compoundQueryLimitClause : undefined,
                compoundQueryOrderByClause : undefined,
            },
            toSql,
            isDerivedTable
        ),
        ")"
    );

    if (query.compoundQueryClause != undefined) {
        result.push(compoundQueryClauseToSql(query.compoundQueryClause, toSql).join(" "));
    }

    if (query.compoundQueryOrderByClause != undefined) {
        result.push(orderByClauseToSql(query.compoundQueryOrderByClause, undefined, toSql).join(" "));
    }

    if (query.compoundQueryLimitClause != undefined) {
        result.push(limitClauseToSql(query.compoundQueryLimitClause, toSql).join(" "));
    }
    return result.join(" ");
}
