import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly (tsql.Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly originalColumns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable";
            readonly nullable: false;
            readonly columns: {
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly originalColumns: {
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }>)[];
    }>;
    selectClause: undefined;
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
declare type AllowedUsedRef = tsql.FromClauseUtil.AllowedUsedRef<typeof query["fromClause"], {
    isLateral: true;
}>;
declare type AllowedExpr = tsql.IExpr<{
    mapper: () => boolean;
    usedRef: AllowedUsedRef;
}>;
/**
 * + `query` allows two columns.
 * + `whereClause` uses one of the allowed columns.
 */
export declare const allowed: AllowedExpr;
export {};
