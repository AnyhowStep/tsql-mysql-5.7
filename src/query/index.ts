export * from "./query-impl";
export * from "./query";

import * as QueryUtil from "./util";
export {
    QueryUtil,
};

import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";

export function from<
    AliasedTableT extends IAliasedTable
> (
    aliasedTable : (
        & AliasedTableT
        & QueryUtil.AssertValidCurrentJoin<QueryUtil.NewInstance, AliasedTableT>
    )
) : (
    QueryUtil.From<QueryUtil.NewInstance, AliasedTableT>
) {
    return QueryUtil.newInstance()
        .from(aliasedTable);
}

export function requireOuterQueryJoins<
    AliasedTablesT extends readonly IAliasedTable[]
> (
    ...aliasedTables : (
        & AliasedTablesT
        & FromClauseUtil.AssertValidOuterQueryJoins<QueryUtil.NewInstance["fromClause"], AliasedTablesT>
    )
) : (
    QueryUtil.RequireOuterQueryJoins<QueryUtil.NewInstance, AliasedTablesT>
) {
    return QueryUtil.newInstance()
        .requireOuterQueryJoins<AliasedTablesT>(...aliasedTables as any);
}

export function requireNullableOuterQueryJoins<
    AliasedTablesT extends readonly IAliasedTable[]
> (
    ...aliasedTables : (
        & AliasedTablesT
        & FromClauseUtil.AssertValidOuterQueryJoins<QueryUtil.NewInstance["fromClause"], AliasedTablesT>
    )
) : (
    QueryUtil.RequireNullableOuterQueryJoins<QueryUtil.NewInstance, AliasedTablesT>
) {
    return QueryUtil.newInstance()
        .requireNullableOuterQueryJoins<AliasedTablesT>(...aliasedTables as any);
}
