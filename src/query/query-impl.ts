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
    PrimaryKey_NonUnion,
    CandidateKey_NonUnion,
    TypeUtil,
    SuperKey_NonUnion,
    PartialRow_NonUnion,
    RawExpr,
    OnDelegate,
    OnClauseUtil,
    TableWithPrimaryKey,
    TableUtil,
    ITable,
    EqCandidateKeyOfTableDelegate,
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
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>
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
            & TypeUtil.AssertNonUnion<AliasedTableT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
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
    innerJoinUsingCandidateKey<
        SrcT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number],
        DstT extends ITable,
        SrcColumnsT extends TableUtil.ColumnArraysFromCandidateKeys<SrcT, DstT>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        srcDelegate : FromClauseUtil.InnerJoinUsingCandidateKeySrcDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], SrcT>,
        aliasedTable : (
            & DstT
            & TypeUtil.AssertNonUnion<DstT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, DstT>
        ),
        eqCandidateKeyofTableDelegate : EqCandidateKeyOfTableDelegate<SrcT, DstT, SrcColumnsT>
    ) : (
        QueryUtil.InnerJoinUsingCandidateKey<Extract<this, QueryUtil.AfterFromClause>, DstT>
    ) {
        return QueryUtil.innerJoinUsingCandidateKey<
            Extract<this, QueryUtil.AfterFromClause>,
            SrcT,
            DstT,
            SrcColumnsT
        >(
            this,
            srcDelegate,
            aliasedTable,
            eqCandidateKeyofTableDelegate
        );
    }
    innerJoinUsingPrimaryKey<
        SrcT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number],
        DstT extends TableWithPrimaryKey
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        srcDelegate : FromClauseUtil.InnerJoinUsingPrimaryKeySrcDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], SrcT>,
        aliasedTable : (
            & DstT
            & TypeUtil.AssertNonUnion<DstT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, DstT>
            & TableUtil.AssertHasNullSafeComparablePrimaryKey<DstT, SrcT["columns"]>
        )
    ) : (
        QueryUtil.InnerJoinUsingPrimaryKey<Extract<this, QueryUtil.AfterFromClause>, DstT>
    ) {
        return QueryUtil.innerJoinUsingPrimaryKey<
            Extract<this, QueryUtil.AfterFromClause>,
            SrcT,
            DstT
        >(
            this,
            srcDelegate,
            aliasedTable
        );
    }
    innerJoin<
        AliasedTableT extends IAliasedTable,
        RawOnClauseT extends RawExpr<boolean>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : (
            & AliasedTableT
            & TypeUtil.AssertNonUnion<AliasedTableT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
        ),
        onDelegate : OnDelegate<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"],
            AliasedTableT,
            (
                & RawOnClauseT
                & OnClauseUtil.AssertNoOuterQueryUsedRef<Extract<this, QueryUtil.AfterFromClause>["fromClause"], RawOnClauseT>
            )
        >
    ) : (
        QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.innerJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            RawOnClauseT
        >(
            this,
            aliasedTable,
            onDelegate
        );
    }
    leftJoinUsingCandidateKey<
        SrcT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number],
        DstT extends ITable,
        SrcColumnsT extends TableUtil.ColumnArraysFromCandidateKeys<SrcT, DstT>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        srcDelegate : FromClauseUtil.LeftJoinUsingCandidateKeySrcDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], SrcT>,
        aliasedTable : (
            & DstT
            & TypeUtil.AssertNonUnion<DstT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, DstT>
        ),
        eqCandidateKeyofTableDelegate : EqCandidateKeyOfTableDelegate<SrcT, DstT, SrcColumnsT>
    ) : (
        QueryUtil.LeftJoinUsingCandidateKey<Extract<this, QueryUtil.AfterFromClause>, DstT>
    ) {
        return QueryUtil.leftJoinUsingCandidateKey<
            Extract<this, QueryUtil.AfterFromClause>,
            SrcT,
            DstT,
            SrcColumnsT
        >(
            this,
            srcDelegate,
            aliasedTable,
            eqCandidateKeyofTableDelegate
        );
    }
    leftJoinUsingPrimaryKey<
        SrcT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number],
        DstT extends TableWithPrimaryKey
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        srcDelegate : FromClauseUtil.LeftJoinUsingPrimaryKeySrcDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], SrcT>,
        aliasedTable : (
            & DstT
            & TypeUtil.AssertNonUnion<DstT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, DstT>
            & TableUtil.AssertHasNullSafeComparablePrimaryKey<DstT, SrcT["columns"]>
        )
    ) : (
        QueryUtil.LeftJoinUsingPrimaryKey<Extract<this, QueryUtil.AfterFromClause>, DstT>
    ) {
        return QueryUtil.leftJoinUsingPrimaryKey<
            Extract<this, QueryUtil.AfterFromClause>,
            SrcT,
            DstT
        >(
            this,
            srcDelegate,
            aliasedTable
        );
    }
    leftJoin<
        AliasedTableT extends IAliasedTable,
        RawOnClauseT extends RawExpr<boolean>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : (
            & AliasedTableT
            & TypeUtil.AssertNonUnion<AliasedTableT>
            & QueryUtil.AssertValidCurrentJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
        ),
        onDelegate : OnDelegate<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"],
            AliasedTableT,
            (
                & RawOnClauseT
                & OnClauseUtil.AssertNoOuterQueryUsedRef<Extract<this, QueryUtil.AfterFromClause>["fromClause"], RawOnClauseT>
            )
        >
    ) : (
        QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.leftJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            RawOnClauseT
        >(
            this,
            aliasedTable,
            onDelegate
        );
    }

    whereEqCandidateKey<
        TableT extends JoinArrayUtil.ExtractWithCandidateKey<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for `WhereEqCandidateKeyDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        ...args : (
            TableT extends JoinArrayUtil.ExtractWithCandidateKey<Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]> ?
            [
                FromClauseUtil.WhereEqCandidateKeyDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], TableT>,
                TypeUtil.StrictUnion<CandidateKey_NonUnion<TableT>>
            ] :
            never
        )
    ) : (
        QueryUtil.WhereEqCandidateKey<Extract<this, QueryUtil.AfterFromClause>>
    ) {
        return QueryUtil.whereEqCandidateKey<
            Extract<this, QueryUtil.AfterFromClause>,
            TableT
        >(
            this,
            ...args
        );
    }
    whereEqColumns<
        TableT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number]
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for `WhereEqColumnsDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        ...args : (
            TableT extends Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number] ?
            [
                FromClauseUtil.WhereEqColumnsDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], TableT>,
                PartialRow_NonUnion<TableT>
            ] :
            never
        )
    ) : (
        QueryUtil.WhereEqColumns<Extract<this, QueryUtil.AfterFromClause>>
    ) {
        return QueryUtil.whereEqColumns<
            Extract<this, QueryUtil.AfterFromClause>,
            TableT
        >(
            this,
            ...args
        );
    }
    whereEqOuterQueryPrimaryKey<
        SrcT extends Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number],
        DstT extends JoinArrayUtil.ExtractWithNullSafeComparablePrimaryKey<
            Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>["fromClause"]["outerQueryJoins"],
            SrcT["columns"]
        >
    > (
        this : Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for
         * `WhereEqOuterQueryPrimaryKeySrcDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        srcDelegate : (
            SrcT extends Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>["fromClause"]["currentJoins"][number] ?
            (
                FromClauseUtil.WhereEqOuterQueryPrimaryKeySrcDelegate<
                    Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>["fromClause"],
                    SrcT
                >
            ) :
            never
        ),
        dstDelegate : (
            FromClauseUtil.WhereEqOuterQueryPrimaryKeyDstDelegate<
                Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>["fromClause"],
                SrcT,
                DstT
            >
        )
    ) : (
        QueryUtil.WhereEqOuterQueryPrimaryKey<Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>>
    ) {
        return QueryUtil.whereEqOuterQueryPrimaryKey<
            Extract<this, QueryUtil.Correlated & QueryUtil.AfterFromClause>,
            SrcT,
            DstT
        >(
            this,
            srcDelegate,
            dstDelegate
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
                PrimaryKey_NonUnion<TableT>
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
    whereEqSuperKey<
        TableT extends JoinArrayUtil.ExtractWithCandidateKey<
            Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        /**
         * This construction effectively makes it impossible for `WhereEqSuperKeyDelegate<>`
         * to return a union type.
         *
         * This is unfortunate but a necessary compromise for now.
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520199818
         *
         * https://github.com/microsoft/TypeScript/issues/32804#issuecomment-520201877
         */
        ...args : (
            TableT extends JoinArrayUtil.ExtractWithCandidateKey<Extract<this, QueryUtil.AfterFromClause>["fromClause"]["currentJoins"]> ?
            [
                FromClauseUtil.WhereEqSuperKeyDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], TableT>,
                SuperKey_NonUnion<TableT>
            ] :
            never
        )
    ) : (
        QueryUtil.WhereEqSuperKey<Extract<this, QueryUtil.AfterFromClause>>
    ) {
        return QueryUtil.whereEqSuperKey<
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
        /**
         * This construction effectively makes it impossible for `WhereNullSafeEqDelegate<>`
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
                PrimitiveExpr
            > ?
            [
                FromClauseUtil.WhereNullSafeEqDelegate<Extract<this, QueryUtil.AfterFromClause>["fromClause"], ColumnT>,
                ValueT
            ] :
            never
        )
    ) : (
        QueryUtil.WhereNullSafeEq<Extract<this, QueryUtil.AfterFromClause>, ColumnT, ValueT>
    ) {
        return QueryUtil.whereNullSafeEq<
            Extract<this, QueryUtil.AfterFromClause>,
            ColumnT,
            ValueT
        >(
            this,
            ...args
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
