import * as tsql from "../../../../../dist";
export declare const query: tsql.Query<{
    fromClause: tsql.IFromClause<{
        outerQueryJoins: undefined;
        currentJoins: undefined;
    }>;
    selectClause: [tsql.IExprSelectItem<{
        mapper: import("type-mapping").Mapper<unknown, boolean | null>;
        tableAlias: "__aliased";
        alias: "and3";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: import("type-mapping").Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "eq";
        usedRef: tsql.IUsedRef<never>;
    }>, tsql.IExprSelectItem<{
        mapper: import("type-mapping").Mapper<unknown, boolean>;
        tableAlias: "__aliased";
        alias: "xor";
        usedRef: tsql.IUsedRef<never>;
    }>];
    limitClause: undefined;
    unionClause: undefined;
    unionLimitClause: undefined;
}>;
