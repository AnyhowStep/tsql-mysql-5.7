import * as tm from "type-mapping/fluent";
import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: readonly (import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myTable";
            readonly nullable: false;
            readonly columns: {
                readonly myTableId: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly originalColumns: {
                readonly myTableId: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myTable";
                    columnAlias: "myTableId";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable1";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable2";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable3";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable4";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable5";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable6";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable7";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable8";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable9";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable10";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable11";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable12";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable13";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable14";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable15";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable16";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable17";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable18";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable19";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | import("@tsql/tsql/dist/join").Join<{
            readonly tableAlias: "myOtherTable20";
            readonly nullable: false;
            readonly columns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: import("@tsql/tsql/dist/column").Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }>)[];
    }>;
}>;
