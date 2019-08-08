import {IAliasedTable, FromClauseUtil, WhereClause, ColumnUtil} from "@tsql/tsql";
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
        this : Extract<this, QueryUtil.BeforeFromClause>,
        aliasedTable : (
            & AliasedTableT
            & QueryUtil.AssertValidCurrentJoin<this, AliasedTableT>
        )
    ) : (
        QueryUtil.From<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>
    ) {
        return QueryUtil.from<
            Extract<this, QueryUtil.BeforeFromClause>,
            AliasedTableT
        >(
            this,
            aliasedTable
        );
    }
    crossJoin<
        AliasedTableT extends IAliasedTable
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : (
            & AliasedTableT
            & QueryUtil.AssertValidCurrentJoin<this, AliasedTableT>
        )
    ) : (
        QueryUtil.CrossJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.crossJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >(
            this,
            aliasedTable
        );
    }

    whereIsNull<
        ColumnT extends ColumnUtil.ExtractNullable<
            ColumnUtil.FromJoinArray<
                Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
            >
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        whereDelegate : FromClauseUtil.WhereIsNullDelegate<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"],
            ColumnT
        >
    ) : (
        QueryUtil.WhereIsNull<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT
        >
    ) {
        return QueryUtil.whereIsNull<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT
        >(
            this,
            whereDelegate
        );
    }
}
