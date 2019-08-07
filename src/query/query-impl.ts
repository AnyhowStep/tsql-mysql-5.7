import {IAliasedTable, FromClauseUtil, WhereClause} from "@tsql/tsql";
import {QueryData, IQuery, ExtraQueryData} from "./query";
import * as QueryUtil from "./util";

export class Query<DataT extends QueryData> implements IQuery<DataT> {
    /*
        From `IQueryBase`
    */
    readonly fromClause : DataT["fromClause"];
    readonly selectClause : DataT["selectClause"];

    readonly limitClause : DataT["limitClause"];

    readonly unionClause : DataT["unionClause"];
    readonly unionLimitClause : DataT["unionLimitClause"];

    /*
        `IQuery`-specific
    */
    readonly whereClause : WhereClause|undefined;

    constructor (data : DataT, extraData : ExtraQueryData) {
        this.fromClause = data.fromClause;
        this.selectClause = data.selectClause;
        this.limitClause = data.limitClause;
        this.unionClause = data.unionClause;
        this.unionLimitClause = data.unionLimitClause;

        this.whereClause = extraData.whereClause;
    }

    readonly buildExprAst = () => {
        throw new Error(`Not implemented`);
    };

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
