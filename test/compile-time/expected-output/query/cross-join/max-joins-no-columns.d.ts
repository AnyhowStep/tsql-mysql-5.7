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
            readonly tableAlias: "myOtherTable1";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable2";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable3";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable4";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable5";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable6";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable7";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable8";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable9";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable10";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable11";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable12";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable13";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable14";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable15";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable16";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable17";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable18";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable19";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable20";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable21";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable22";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable23";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable24";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable25";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable26";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable27";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable28";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable29";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable30";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable31";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable32";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable33";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable34";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable35";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable36";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable37";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable38";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable39";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable40";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable41";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable42";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable43";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable44";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable45";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable46";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable47";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable48";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable49";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable50";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable51";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable52";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable53";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable54";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable55";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable56";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable57";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable58";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable59";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable60";
            readonly nullable: false;
            readonly columns: {};
            readonly originalColumns: {};
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
