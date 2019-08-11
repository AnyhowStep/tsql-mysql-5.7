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
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable1";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable1";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable2";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable2";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable3";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable3";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable4";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable4";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable5";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable5";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable6";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable6";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable7";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable7";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable8";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable8";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable9";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable9";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable10";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable10";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable11";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable11";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable12";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable12";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable13";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable13";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable14";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable14";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable15";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable15";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable16";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable16";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable17";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable17";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable18";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable18";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable19";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable19";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable20";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable20";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable21";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable21";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable22";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable22";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable23";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable23";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable24";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable24";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable25";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable25";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable26";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable26";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable27";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable27";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable28";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable28";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable29";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable29";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable30";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable30";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable31";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable31";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable32";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable32";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable33";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable33";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable34";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable34";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable35";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable35";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable36";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable36";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable37";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable37";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable38";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable38";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable39";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable39";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable40";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable40";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable41";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable41";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable42";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable42";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable43";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable43";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable44";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable44";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable45";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable45";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable46";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable46";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable47";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable47";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable48";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable48";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable49";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable49";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable50";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable50";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable51";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable51";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable52";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable52";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable53";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable53";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable54";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable54";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable55";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable55";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable56";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable56";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable57";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable57";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable58";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable58";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable59";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable59";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }> | tsql.Join<{
            readonly tableAlias: "myOtherTable60";
            readonly nullable: false;
            readonly columns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly originalColumns: {
                readonly x: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "x";
                    mapper: tm.Mapper<unknown, bigint>;
                }>;
                readonly y: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "y";
                    mapper: tm.Mapper<unknown, string>;
                }>;
                readonly z: tsql.Column<{
                    tableAlias: "myOtherTable60";
                    columnAlias: "z";
                    mapper: tm.Mapper<unknown, boolean>;
                }>;
            };
            readonly primaryKey: undefined;
            readonly candidateKeys: readonly [];
            readonly deleteEnabled: true;
            readonly mutableColumns: readonly [];
        }>)[];
    }>;
    selectClause: undefined;
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
