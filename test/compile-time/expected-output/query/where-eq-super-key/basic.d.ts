import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly tsql.Join<{
            tableAlias: "myTable";
            nullable: false;
            columns: {
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
                readonly nonKey0: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "nonKey0";
                    mapper: tm.Mapper<unknown, Date>;
                }>;
                readonly nonKey1: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "nonKey1";
                    mapper: tm.Mapper<unknown, number>;
                }>;
            };
            originalColumns: {
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
                readonly nonKey0: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "nonKey0";
                    mapper: tm.Mapper<unknown, Date>;
                }>;
                readonly nonKey1: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "nonKey1";
                    mapper: tm.Mapper<unknown, number>;
                }>;
            };
            primaryKey: readonly ("myTableIdA" | "myTableIdB")[];
            candidateKeys: readonly (readonly ("myTableIdA" | "myTableIdB")[] | readonly ("otherColumn" | "myTableIdA")[])[];
            deleteEnabled: true;
            mutableColumns: readonly [];
        }>[];
    }>;
    selectClause: undefined;
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
