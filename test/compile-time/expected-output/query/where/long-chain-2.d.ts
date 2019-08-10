import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const expr: tsql.ExprImpl<tm.Mapper<unknown, boolean>, tsql.IUsedRef<{}>>;
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly tsql.Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly myColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myColumn";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly myColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myColumn";
                    mapper: tm.Mapper<unknown, boolean>;
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
