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

export function selectClauseToSql (
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
