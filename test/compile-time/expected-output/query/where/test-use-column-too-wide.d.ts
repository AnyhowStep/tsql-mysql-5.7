import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            }; /**
             * We make this `WHERE` clause handle `myTableId`, even if it is `null`.
             * So, `bigint|null`.
             */
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
/**
 * This is allowed because the column will always be `bigint`.
 * And our `WHERE` clause can handle both `bigint` and `null` cases.
 */
export declare const notAllowed: AllowedExpr;
export {};
