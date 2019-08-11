import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly tsql.Join<{
            tableAlias: "myTable";
            nullable: false;
            columns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, 1n>;
                }>;
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, false>;
                }>;
            };
            originalColumns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly otherColumn: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "otherColumn";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            primaryKey: undefined;
            deleteEnabled: true;
            mutableColumns: readonly [];
        }>[];
    }>;
    selectClause: undefined;
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
