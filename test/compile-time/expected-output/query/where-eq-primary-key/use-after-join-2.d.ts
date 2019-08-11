import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly (tsql.Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly myTableIdA: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableIdA";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myTableIdB: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableIdB";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly myTableIdA: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableIdA";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myTableIdB: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableIdB";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: readonly ("myTableIdA" | "myTableIdB")[];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable";
            readonly nullable: false;
            readonly columns: {
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly myOtherTableIdA: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableIdA";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myOtherTableIdB: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableIdB";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly myOtherTableIdA: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableIdA";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myOtherTableIdB: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableIdB";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: readonly ("myOtherTableIdA" | "myOtherTableIdB")[];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }>)[];
    }>;
    selectClause: undefined;
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
