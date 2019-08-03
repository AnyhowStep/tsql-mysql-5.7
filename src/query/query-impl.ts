import {IAliasedTable, FromClauseUtil} from "@tsql/tsql";
import {QueryData, IQuery} from "./query";
import * as QueryUtil from "./util";

export class Query<DataT extends QueryData> implements IQuery<DataT> {
    readonly fromClause : DataT["fromClause"];

    constructor (data : DataT) {
        this.fromClause = data.fromClause;
    }

    requireOuterQueryJoins<
        AliasedTablesT extends readonly IAliasedTable[]
    > (
        ...aliasedTables : (
            & AliasedTablesT
            & FromClauseUtil.AssertValidOuterQueryJoins<this["fromClause"], AliasedTablesT>
        )
    ) : (
        QueryUtil.RequireOuterQueryJoins<this, AliasedTablesT>
    ) {
        return QueryUtil.requireOuterQueryJoins<
            this,
            AliasedTablesT
        >(
            this,
            ...(aliasedTables as any)
        );
    }
    requireNullableOuterQueryJoins<
        AliasedTablesT extends readonly IAliasedTable[]
    > (
        ...aliasedTables : (
            & AliasedTablesT
            & FromClauseUtil.AssertValidOuterQueryJoins<this["fromClause"], AliasedTablesT>
        )
    ) : (
        QueryUtil.RequireNullableOuterQueryJoins<this, AliasedTablesT>
    ) {
        return QueryUtil.requireNullableOuterQueryJoins<
            this,
            AliasedTablesT
        >(
            this,
            ...(aliasedTables as any)
        );
    }

    from<
        AliasedTableT extends IAliasedTable
    > (
        this : QueryUtil.BeforeFromClause,
        aliasedTable : (
            & AliasedTableT
            & QueryUtil.AssertValidCurrentJoin<this, AliasedTableT>
        )
    ) : (
        QueryUtil.From<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>
    ) {
        return QueryUtil.from(this, aliasedTable);
    }
    crossJoin<
        AliasedTableT extends IAliasedTable
    > (
        this : QueryUtil.AfterFromClause,
        aliasedTable : (
            & AliasedTableT
            & QueryUtil.AssertValidCurrentJoin<this, AliasedTableT>
        )
    ) : (
        QueryUtil.CrossJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.crossJoin(this, aliasedTable);
    }
}
