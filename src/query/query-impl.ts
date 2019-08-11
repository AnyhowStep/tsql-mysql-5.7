import * as tm from "type-mapping";
import {
    IAliasedTable,
    FromClauseUtil,
    WhereClause,
    ColumnUtil,
    PrimitiveExpr,
    NonNullPrimitiveExpr,
    WhereDelegate,
    JoinArrayUtil,
    PrimaryKey,
} from "@tsql/tsql";
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

    whereEqPrimaryKey<
        TableT extends JoinArrayUtil.ExtractWithPrimaryKey<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for `WhereEqPrimaryKeyDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        ...args : (
            TableT extends JoinArrayUtil.ExtractWithPrimaryKey<Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]> ?
            [
                FromClauseUtil.WhereEqPrimaryKeyDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], TableT>,
                PrimaryKey<TableT>
            ] :
            never
        )
    ) : (
        QueryUtil.WhereEqPrimaryKey<Extract<this, QueryUtil.AfterFromClause>>
    ) {
        return QueryUtil.whereEqPrimaryKey<
            Extract<this, QueryUtil.AfterFromClause>,
            TableT
        >(
            this,
            ...args
        );
    }
    whereEq<
        ColumnT extends ColumnUtil.ExtractWithType<
            ColumnUtil.FromJoinArray<
                Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
            >,
            NonNullPrimitiveExpr
        >,
        ValueT extends tm.OutputOf<ColumnT["mapper"]>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for `WhereEqDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        ...args : (
            ColumnT extends ColumnUtil.ExtractWithType<
                ColumnUtil.FromJoinArray<Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]>,
                NonNullPrimitiveExpr
            > ?
            [
                FromClauseUtil.WhereEqDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], ColumnT>,
                ValueT
            ] :
            never
        )
    ) : (
        QueryUtil.WhereEq<Extract<this, QueryUtil.AfterFromClause>, ColumnT, ValueT>
    ) {
        return QueryUtil.whereEq<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT,
            ValueT
        >(
            this,
            ...args
        );
    }
    whereIsNotNull<
        ColumnT extends ColumnUtil.ExtractNullable<
            ColumnUtil.FromJoinArray<
                Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
            >
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        whereIsNotNullDelegate : FromClauseUtil.WhereIsNotNullDelegate<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"],
            ColumnT
        >
    ) : (
        QueryUtil.WhereIsNotNull<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT
        >
    ) {
        return QueryUtil.whereIsNotNull<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT
        >(
            this,
            whereIsNotNullDelegate
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
        whereIsNullDelegate : FromClauseUtil.WhereIsNullDelegate<
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
            whereIsNullDelegate
        );
    }
    whereNullSafeEq<
        ColumnT extends ColumnUtil.ExtractWithType<
            ColumnUtil.FromJoinArray<
                Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
            >,
            PrimitiveExpr
        >,
        ValueT extends tm.OutputOf<ColumnT["mapper"]>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        whereNullSafeEqDelegate : FromClauseUtil.WhereNullSafeEqDelegate<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"],
            ColumnT
        >,
        value : ValueT
    ) : (
        QueryUtil.WhereNullSafeEq<Extract<this, QueryUtil.AfterFromClause>, ColumnT, ValueT>
    ) {
        return QueryUtil.whereNullSafeEq<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT,
            ValueT
        >(
            this,
            whereNullSafeEqDelegate,
            value
        );
    }
    where (
        whereDelegate : WhereDelegate<
            this["fromClause"]
        >
    ) : (
        QueryUtil.Where<this>
    ) {
        return QueryUtil.where<
            this
        >(
            this,
            whereDelegate
        );
    }
}
