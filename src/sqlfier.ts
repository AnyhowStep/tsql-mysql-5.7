import * as tsql from "@tsql/tsql";

function selectClauseColumnToSql (column : tsql.IColumn, isDerivedTable : boolean) : string[] {
    return [
        [
            tsql.escapeIdentifierWithBackticks(column.tableAlias),
            ".",
            tsql.escapeIdentifierWithBackticks(column.columnAlias)
        ].join(""),
        "AS",
        tsql.escapeIdentifierWithBackticks(
            isDerivedTable ?
            column.columnAlias :
            `${column.tableAlias}${tsql.SEPARATOR}${column.columnAlias}`
        )
    ];
}
function selectClauseColumnArrayToSql (columns : tsql.IColumn[], isDerivedTable : boolean) : string[] {
    columns.sort((a, b) => {
        const tableAliasCmp = a.tableAlias.localeCompare(b.tableAlias);
        if (tableAliasCmp != 0) {
            return tableAliasCmp;
        }
        return a.columnAlias.localeCompare(b.columnAlias);
    });
    const result : string[] = [];
    for (const column of columns) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(
            ...selectClauseColumnToSql(column, isDerivedTable)
        );
    }
    return result;
}
function selectClauseColumnMapToSql (map : tsql.ColumnMap, isDerivedTable : boolean) : string[] {
    const columns = tsql.ColumnUtil.fromColumnMap(map);
    return selectClauseColumnArrayToSql(columns, isDerivedTable);
}
function selectClauseColumnRefToSql (ref : tsql.ColumnRef, isDerivedTable : boolean) : string[] {
    const columns = tsql.ColumnUtil.fromColumnRef(ref);
    return selectClauseColumnArrayToSql(columns, isDerivedTable);
}

function selectClauseToSql (
    selectClause : tsql.SelectClause,
    toSql : (ast : tsql.Ast) => string,
    isDerivedTable : boolean,
    isDistinct : boolean
) : string[] {
    const result : string[] = [];
    for (const selectItem of selectClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (tsql.ColumnUtil.isColumn(selectItem)) {
            result.push(
                ...selectClauseColumnToSql(selectItem, isDerivedTable)
            );
        } else if (tsql.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            result.push(
                toSql(selectItem.unaliasedAst),
                "AS",
                tsql.escapeIdentifierWithBackticks(
                    isDerivedTable ?
                    selectItem.alias :
                    `${selectItem.tableAlias}${tsql.SEPARATOR}${selectItem.alias}`
                )
            );
        } else if (tsql.ColumnMapUtil.isColumnMap(selectItem)) {
            result.push(...selectClauseColumnMapToSql(selectItem, isDerivedTable));
        } else if (tsql.ColumnRefUtil.isColumnRef(selectItem)) {
            result.push(...selectClauseColumnRefToSql(selectItem, isDerivedTable));
        } else {
            throw new Error(`Not implemented`);
        }
    }
    return isDistinct ?
        ["SELECT DISTINCT", ...result] :
        ["SELECT", ...result];
}


/**
 * @todo More complicated processing
 */
function queryToSql (
    query : tsql.IQueryBase,
    toSql : (ast : tsql.Ast) => string,
    isDerivedTable : boolean
) {
    const result : string[] = [];
    if (query.selectClause != undefined) {
        result.push(
            selectClauseToSql(query.selectClause, toSql, isDerivedTable, query.isDistinct)
            .join(" ")
        );
    }
    return result.join(" ");
}

export const sqlfier : tsql.Sqlfier = {
    ...tsql.notImplementedSqlfier,
    identifierSqlfier : (identifierNode) => identifierNode.identifiers
        .map(tsql.escapeIdentifierWithBackticks)
        .join("."),
    literalValueSqlfier : {
        [tsql.LiteralValueType.DECIMAL] : ({literalValue, precision, scale}, toSql) => toSql(
            tsql.castAsDecimal(
                literalValue,
                precision,
                scale
            ).ast
        ),
        [tsql.LiteralValueType.STRING] : ({literalValue}) => tsql.cStyleEscapeString(literalValue),
        [tsql.LiteralValueType.DOUBLE] : ({literalValue}) => tsql.escapeValue(literalValue),
        [tsql.LiteralValueType.BIGINT_SIGNED] : ({literalValue}) => tsql.escapeValue(literalValue),
        [tsql.LiteralValueType.BOOLEAN] : ({literalValue}) => tsql.escapeValue(literalValue),
        [tsql.LiteralValueType.BUFFER] : ({literalValue}) => tsql.escapeValue(literalValue),
        [tsql.LiteralValueType.NULL] : ({literalValue}) => tsql.escapeValue(literalValue),
        [tsql.LiteralValueType.DATE_TIME] : ({literalValue}, toSql) => toSql(
            tsql.utcStringToTimestamp(
                tsql.DateTimeUtil.toSqlUtc(literalValue, 3)
            ).ast
        ),
    },
    operatorSqlfier : {
        ...tsql.notImplementedSqlfier.operatorSqlfier,
    },
    queryBaseSqlfier : (rawQuery, toSql) => {
        return queryToSql(rawQuery, toSql, false);
    },
    caseValueSqlfier : (node) => {
        const result : tsql.Ast[] = [
            "CASE", node.value,
        ];
        for (const [compareValue, thenResult] of node.cases) {
            result.push(["WHEN", compareValue, "THEN", thenResult]);
        }
        if (node.else != undefined) {
            result.push(["ELSE", node.else]);
        }
        result.push("END");
        return result;
    },
    caseConditionSqlfier : (node) => {
        const result : tsql.Ast[] = [
            "CASE"
        ];
        for (const [condition, thenResult] of node.branches) {
            result.push(["WHEN", condition, "THEN", thenResult]);
        }
        if (node.else != undefined) {
            result.push(["ELSE", node.else]);
        }
        result.push("END");
        return result;
    },
};
