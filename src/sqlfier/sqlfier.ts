import * as tsql from "@tsql/tsql";
import {queryToSql} from "./query-to-sql";

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
        /*
            Comparison Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html
        */
        [tsql.OperatorType.NULL_SAFE_EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, "<=>"),

        /*
            Arithmetic Operators
            https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html
        */
        [tsql.OperatorType.ADDITION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "+"),
        [tsql.OperatorType.SUBTRACTION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "-"),
        [tsql.OperatorType.MULTIPLICATION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "*"),
        [tsql.OperatorType.INTEGER_DIVISION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "DIV"),

        /*
            Date and Time Functions
            https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html
        */
        [tsql.OperatorType.UTC_STRING_TO_TIMESTAMP_CONSTRUCTOR] : ({operands}) => tsql.functionCall(
            "CONVERT_TZ",
            [
                tsql.functionCall(
                    "TIMESTAMP",
                    operands
                ),
                tsql.cStyleEscapeString("+00:00"),
                "@@session.time_zone"
            ]
        ),

        /*
            Cast Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html
        */
        [tsql.OperatorType.CAST_AS_DECIMAL] : ({operands : [arg, precision, scale]}, toSql) => tsql.functionCall(
            "CAST",
            [
                toSql(arg) + `AS DECIMAL(${toSql(precision)}, ${toSql(scale)})`
            ]
        ),

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
