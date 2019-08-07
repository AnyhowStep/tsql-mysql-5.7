import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly myTableId: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint | null>;
                }>;
            };
            readonly originalColumns: {
                readonly myTableId: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint | null>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }>[];
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
export declare const notAllowed: AllowedExpr;
export {};
