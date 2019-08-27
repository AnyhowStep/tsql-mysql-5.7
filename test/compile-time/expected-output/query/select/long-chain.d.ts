import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly (tsql.Join<{
            tableAlias: "myTable";
            nullable: false;
            columns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            originalColumns: {
                readonly myTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            primaryKey: undefined;
            candidateKeys: readonly [];
            deleteEnabled: true;
            mutableColumns: readonly [];
        }> | tsql.Join<{
            tableAlias: "myOtherTable";
            nullable: true;
            columns: {
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            originalColumns: {
                readonly myOtherTableId: tsql.Column<{
                    tableAlias: "myOtherTable";
                    columnAlias: "myOtherTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            primaryKey: readonly "myOtherTableId"[];
            candidateKeys: readonly (readonly "myOtherTableId"[])[];
            deleteEnabled: true;
            mutableColumns: readonly [];
        }>)[];
    }>;
    selectClause: [tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq2";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq3";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq4";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq5";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq6";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq7";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq8";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq9";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq10";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq11";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq12";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq13";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq14";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq15";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq16";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq17";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq18";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq19";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq20";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq21";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq22";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq23";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq24";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq25";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq26";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq27";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq28";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq29";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq30";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq31";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq32";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq33";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq34";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq35";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq36";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq37";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq38";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq39";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq40";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq41";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq42";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq43";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq44";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq45";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq46";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq47";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq48";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq49";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq50";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq51";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq52";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq53";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq54";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq55";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq56";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq57";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq58";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq59";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: tm.Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "nullSafeEq60";
        usedRef: tsql.IUsedRef<never>;
    }>];
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
