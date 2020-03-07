import * as squill from "@squill/squill";

function selectClauseColumnToSql (column : squill.IColumn, isDerivedTable : boolean) : string[] {
    return [
        [
            squill.escapeIdentifierWithBackticks(column.tableAlias),
            ".",
            squill.escapeIdentifierWithBackticks(column.columnAlias)
        ].join(""),
        "AS",
        squill.escapeIdentifierWithBackticks(
            isDerivedTable ?
            column.columnAlias :
            `${column.tableAlias}${squill.SEPARATOR}${column.columnAlias}`
        )
    ];
}
function selectClauseColumnArrayToSql (columns : squill.IColumn[], isDerivedTable : boolean) : string[] {
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
function selectClauseColumnMapToSql (map : squill.ColumnMap, isDerivedTable : boolean) : string[] {
    const columns = squill.ColumnUtil.fromColumnMap(map);
    return selectClauseColumnArrayToSql(columns, isDerivedTable);
}
function selectClauseColumnRefToSql (ref : squill.ColumnRef, isDerivedTable : boolean) : string[] {
    const columns = squill.ColumnUtil.fromColumnRef(ref);
    return selectClauseColumnArrayToSql(columns, isDerivedTable);
}

export function selectClauseToSql (
    selectClause : squill.SelectClause,
    toSql : (ast : squill.Ast) => string,
    isDerivedTable : boolean,
    isDistinct : boolean
) : string[] {
    const result : string[] = [];
    for (const selectItem of selectClause) {
        if (result.length > 0) {
            result.push(",");
        }
        if (squill.ColumnUtil.isColumn(selectItem)) {
            result.push(
                ...selectClauseColumnToSql(selectItem, isDerivedTable)
            );
        } else if (squill.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            result.push(
                toSql(selectItem.unaliasedAst),
                "AS",
                squill.escapeIdentifierWithBackticks(
                    isDerivedTable ?
                    selectItem.alias :
                    `${selectItem.tableAlias}${squill.SEPARATOR}${selectItem.alias}`
                )
            );
        } else if (squill.ColumnMapUtil.isColumnMap(selectItem)) {
            result.push(...selectClauseColumnMapToSql(selectItem, isDerivedTable));
        } else if (squill.ColumnRefUtil.isColumnRef(selectItem)) {
            result.push(...selectClauseColumnRefToSql(selectItem, isDerivedTable));
        } else {
            throw new Error(`Not implemented`);
        }
    }
    return isDistinct ?
        ["SELECT DISTINCT", ...result] :
        ["SELECT", ...result];
}
