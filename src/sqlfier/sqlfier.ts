import * as tsql from "@tsql/tsql";
import {queryToSql, nonCompoundQueryToSql} from "./query-to-sql";
import {compoundQueryClauseToSql} from "./compound-query-clause-to-sql";
import {orderByClauseToSql} from "./order-by-clause-to-sql";
import {limitClauseToSql} from "./limit-clause-to-sql";

export const sqlfier : tsql.Sqlfier = {
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
        /*
            Comparison Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html
        */
        [tsql.OperatorType.BETWEEN_AND] : ({operands}) => [
            operands[0],
            "BETWEEN",
            operands[1],
            "AND",
            operands[2]
        ],
        [tsql.OperatorType.NOT_BETWEEN_AND] : ({operands}) => [
            operands[0],
            "NOT BETWEEN",
            operands[1],
            "AND",
            operands[2]
        ],
        [tsql.OperatorType.COALESCE] : ({operatorType, operands}) => tsql.functionCall(operatorType, operands),
        [tsql.OperatorType.EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, "="),
        [tsql.OperatorType.NULL_SAFE_EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, "<=>"),
        [tsql.OperatorType.NOT_NULL_SAFE_EQUAL] : ({operands}) => [
            "NOT",
            "(",
            tsql.AstUtil.insertBetween(operands, "<=>"),
            ")"
        ],
        [tsql.OperatorType.LESS_THAN] : ({operands}) => tsql.AstUtil.insertBetween(operands, "<"),
        [tsql.OperatorType.GREATER_THAN] : ({operands}) => tsql.AstUtil.insertBetween(operands, ">"),
        [tsql.OperatorType.LESS_THAN_OR_EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, "<="),
        [tsql.OperatorType.GREATER_THAN_OR_EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, ">="),
        [tsql.OperatorType.IN_ARRAY] : ({operands : [x, ...rest]}) => {
            return [
                x,
                tsql.functionCall("IN", [...rest])
            ];
        },
        [tsql.OperatorType.IN_QUERY] : ({operands : [x, y]}) => {
            /**
             * https://github.com/AnyhowStep/tsql/issues/198
             *
             * Not a MySQL problem, but nice to have some consistency
             *
             * @todo https://github.com/AnyhowStep/tsql/issues/227
             */
            let query = tsql.Parentheses.IsParentheses(y) ?
                y.ast :
                y;
            if (!tsql.QueryBaseUtil.isQuery(query)) {
                throw new Error(`Expected query for IN_QUERY`);
            }
            if (
                query.limitClause != undefined ||
                query.compoundQueryClause != undefined ||
                query.compoundQueryLimitClause != undefined ||
                query.compoundQueryOrderByClause != undefined
            ) {
                const derivedTable = tsql.QueryBaseUtil.as(
                    query as tsql.QueryBaseUtil.AfterSelectClause,
                    "tmp"
                );
                query = (
                    tsql.QueryUtil.newInstance()
                    .from(derivedTable)
                    .select(columns => [
                        columns[
                            Object.keys(columns)[0] as keyof typeof columns
                        ]
                    ] as any)
                ) as unknown as tsql.IQueryBase;
            }
            return [
                x,
                tsql.functionCall("IN", [
                    query
                ])
            ];
        },
        [tsql.OperatorType.NOT_IN_ARRAY] : ({operands : [x, ...rest]}) => {
            return [
                x,
                tsql.functionCall("NOT IN", [...rest])
            ];
        },
        [tsql.OperatorType.NOT_IN_QUERY] : ({operands : [x, y]}) => {
            /**
             * https://github.com/AnyhowStep/tsql/issues/198
             *
             * Not a MySQL problem, but nice to have some consistency
             *
             * @todo https://github.com/AnyhowStep/tsql/issues/227
             */
            let query = tsql.Parentheses.IsParentheses(y) ?
                y.ast :
                y;
            if (!tsql.QueryBaseUtil.isQuery(query)) {
                throw new Error(`Expected query for NOT_IN_QUERY`);
            }
            if (
                query.limitClause != undefined ||
                query.compoundQueryClause != undefined ||
                query.compoundQueryLimitClause != undefined ||
                query.compoundQueryOrderByClause != undefined
            ) {
                const derivedTable = tsql.QueryBaseUtil.as(
                    query as tsql.QueryBaseUtil.AfterSelectClause,
                    "tmp"
                );
                query = (
                    tsql.QueryUtil.newInstance()
                    .from(derivedTable)
                    .select(columns => [
                        columns[
                            Object.keys(columns)[0] as keyof typeof columns
                        ]
                    ] as any)
                ) as unknown as tsql.IQueryBase;
            }
            return [
                x,
                tsql.functionCall("NOT IN", [
                    query
                ])
            ];
        },
        [tsql.OperatorType.IS_NOT_NULL] : ({operands}) => [operands[0], "IS NOT NULL"],
        [tsql.OperatorType.IS_NULL] : ({operands}) => [operands[0], "IS NULL"],
        [tsql.OperatorType.IS_UNKNOWN] : ({operands}) => [operands[0], "IS UNKNOWN"],
        [tsql.OperatorType.IS_NOT_UNKNOWN] : ({operands}) => [operands[0], "IS NOT UNKNOWN"],
        [tsql.OperatorType.IS_TRUE] : ({operands}) => [operands[0], "IS TRUE"],
        [tsql.OperatorType.IS_NOT_TRUE] : ({operands}) => [operands[0], "IS NOT TRUE"],
        [tsql.OperatorType.IS_FALSE] : ({operands}) => [operands[0], "IS FALSE"],
        [tsql.OperatorType.IS_NOT_FALSE] : ({operands}) => [operands[0], "IS NOT FALSE"],
        [tsql.OperatorType.LIKE_ESCAPE] : ({operands : [expr, pattern, escapeChar]}) => [
            expr, "LIKE", pattern, "ESCAPE", escapeChar
        ],
        [tsql.OperatorType.NOT_LIKE_ESCAPE] : ({operands : [expr, pattern, escapeChar]}) => [
            expr, "NOT LIKE", pattern, "ESCAPE", escapeChar
        ],
        [tsql.OperatorType.NOT_EQUAL] : ({operands}) => tsql.AstUtil.insertBetween(operands, "<>"),
        [tsql.OperatorType.LEAST] : ({operatorType, operands}) => tsql.functionCall(operatorType, operands),
        [tsql.OperatorType.GREATEST] : ({operatorType, operands}) => tsql.functionCall(operatorType, operands),

        /*
            Logical Operators
            https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html
        */
       [tsql.OperatorType.AND] : ({operands}) => tsql.AstUtil.insertBetween(operands, "AND"),
       [tsql.OperatorType.OR] : ({operands}) => tsql.AstUtil.insertBetween(operands, "OR"),
       [tsql.OperatorType.NOT] : ({operands}) => [
           "NOT",
           operands[0]
       ],
       [tsql.OperatorType.XOR] : ({operands}) => tsql.AstUtil.insertBetween(operands, "XOR"),

        /*
            Control Flow Functions
            https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html
        */
        [tsql.OperatorType.IF] : ({operands : [a, b, c]}) => [
            "CASE WHEN",
            a,
            "THEN",
            b,
            "ELSE",
            c,
            "END"
        ],
        [tsql.OperatorType.IF_NULL] : ({operands}) => tsql.functionCall("IFNULL", operands),
        [tsql.OperatorType.NULL_IF_EQUAL] : ({operands}) => tsql.functionCall("NULLIF", operands),

        /*
            String Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/string-functions.html
        */
        [tsql.OperatorType.ASCII] : ({operands}) => tsql.functionCall("ASCII", operands),
        [tsql.OperatorType.BIN] : ({operands}) => tsql.functionCall("BIN", operands),
        [tsql.OperatorType.BIT_LENGTH] : ({operands}) => tsql.functionCall("BIT_LENGTH", operands),
        [tsql.OperatorType.CHAR_LENGTH] : ({operands}) => tsql.functionCall("CHAR_LENGTH", operands),
        [tsql.OperatorType.OCTET_LENGTH] : ({operands}) => tsql.functionCall("OCTET_LENGTH", operands),
        [tsql.OperatorType.CONCAT] : ({operands}) => tsql.functionCall("CONCAT", operands),
        [tsql.OperatorType.NULL_SAFE_CONCAT] : ({operands}) => tsql.functionCall(
            "CONCAT",
            operands.map(operand => tsql.functionCall("COALESCE", [operand, "''"]))
        ),
        [tsql.OperatorType.CONCAT_WS] : ({operands}) => tsql.functionCall("CONCAT_WS", operands),
        [tsql.OperatorType.FROM_BASE64] : ({operands}) => tsql.functionCall("FROM_BASE64", operands),
        [tsql.OperatorType.HEX] : ({operands}) => tsql.functionCall("HEX", operands),
        [tsql.OperatorType.IN_STR] : ({operands}) => tsql.functionCall("INSTR", operands),
        [tsql.OperatorType.LPAD] : ({operands}) => tsql.functionCall("LPAD", operands),
        [tsql.OperatorType.RPAD] : ({operands}) => tsql.functionCall("RPAD", operands),
        [tsql.OperatorType.LTRIM] : ({operands}) => tsql.functionCall("LTRIM", operands),
        [tsql.OperatorType.RTRIM] : ({operands}) => tsql.functionCall("RTRIM", operands),
        [tsql.OperatorType.TRIM] : ({operands}) => tsql.functionCall("TRIM", operands),
        [tsql.OperatorType.POSITION] : ({operands}) => tsql.functionCall("POSITION", [
            tsql.AstUtil.insertBetween(operands, "IN")
        ]),
        [tsql.OperatorType.REPEAT] : ({operands}) => tsql.functionCall("REPEAT", operands),
        [tsql.OperatorType.REPLACE] : ({operands}) => tsql.functionCall("REPLACE", operands),
        [tsql.OperatorType.REVERSE] : ({operands}) => tsql.functionCall("REVERSE", operands),
        [tsql.OperatorType.TO_BASE64] : ({operands}) => tsql.functionCall("TO_BASE64", operands),
        [tsql.OperatorType.UNHEX] : ({operands}) => tsql.functionCall("UNHEX", operands),
        [tsql.OperatorType.UPPER] : ({operands}) => tsql.functionCall("UPPER", operands),
        [tsql.OperatorType.LOWER] : ({operands}) => tsql.functionCall("LOWER", operands),

        /*
            Arithmetic Operators
            https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html
        */
        [tsql.OperatorType.ADDITION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "+"),
        [tsql.OperatorType.SUBTRACTION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "-"),
        [tsql.OperatorType.MULTIPLICATION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "*"),
        [tsql.OperatorType.INTEGER_DIVISION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "DIV"),
        [tsql.OperatorType.FRACTIONAL_DIVISION]: ({operands}) => tsql.AstUtil.insertBetween(operands, "/"),
        [tsql.OperatorType.UNARY_MINUS]: ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * @todo Decide how to handle,
                 * ```sql
                 *  SELECT -9223372036854775808; -- BIGINT SIGNED
                 *  > 9223372036854775808 -- DECIMAL
                 * ```
                 *
                 * We do not want this implicit conversion.
                 * But it only seems to happen to expressions that do not reference a column...
                 */
                return ["-", operands[0]];
            } else {
                return ["-", operands[0]];
            }
        },

        /*
            Mathematical Functions
            https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html
        */
        [tsql.OperatorType.ABSOLUTE_VALUE] : ({operands}) => tsql.functionCall("ABS", operands),
        [tsql.OperatorType.ARC_COSINE] : ({operands}) => tsql.functionCall("ACOS", operands),
        [tsql.OperatorType.ARC_SINE] : ({operands}) => tsql.functionCall("ASIN", operands),
        [tsql.OperatorType.ARC_TANGENT] : ({operands}) => tsql.functionCall("ATAN", operands),
        [tsql.OperatorType.ARC_TANGENT_2] : ({operands}) => tsql.functionCall("ATAN2", operands),
        [tsql.OperatorType.CUBE_ROOT] : ({operands}) => tsql.functionCall("POWER", [...operands, "1.0/3.0"]),
        [tsql.OperatorType.CEILING] : ({operands}) => tsql.functionCall("CEILING", operands),
        [tsql.OperatorType.COSINE] : ({operands}) => tsql.functionCall("COS", operands),
        [tsql.OperatorType.COTANGENT] : ({operands}) => tsql.functionCall("COT", operands),
        [tsql.OperatorType.DEGREES] : ({operands}) => tsql.functionCall("DEGREES", operands),
        [tsql.OperatorType.NATURAL_EXPONENTIATION] : ({operands}) => tsql.functionCall("EXP", operands),
        [tsql.OperatorType.FLOOR] : ({operands}) => tsql.functionCall("FLOOR", operands),
        [tsql.OperatorType.LN] : ({operands}) => tsql.functionCall("LN", operands),
        [tsql.OperatorType.LOG] : ({operands}) => tsql.functionCall("LOG", operands),
        [tsql.OperatorType.LOG2] : ({operands}) => tsql.functionCall("LOG2", operands),
        [tsql.OperatorType.LOG10] : ({operands}) => tsql.functionCall("LOG10", operands),
        [tsql.OperatorType.PI] : () => tsql.functionCall("PI", []),
        [tsql.OperatorType.POWER] : ({operands}) => tsql.functionCall("POWER", operands),
        [tsql.OperatorType.RADIANS] : ({operands}) => tsql.functionCall("RADIANS", operands),
        [tsql.OperatorType.RANDOM] : ({operands, typeHint}, toSql) => {
            if (typeHint == tsql.TypeHint.DOUBLE) {
                return tsql.functionCall("RAND", operands);
            } else if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * `RAND()` returns `0.0 <= v < 1.0`.
                 *
                 * `FLOOR(CAST(RAND() AS DECIMAL(65, 30)) * 9223372036854775807)`
                 * will give us `0 <= v < 9223372036854775807`
                 *
                 * `FLOOR(CAST(RAND() AS DECIMAL(65, 30)) * -9223372036854775808) - 1`
                 * will give us `-9223372036854775808 <= v < 0`
                 */
                /**
                 * `0.0 <= v < 1.0`
                 */
                const randomDecimal = tsql.castAsDecimal(
                    tsql.double.random(),
                    65,
                    30
                );
                /**
                 * `0 <= v < 9223372036854775807`
                 */
                const randomNonNegative = tsql.decimal.floor(
                    tsql.decimal.mul(
                        randomDecimal,
                        tsql.decimalLiteral(
                            "9223372036854775807",
                            65,
                            30
                        )
                    )
                );
                /**
                 * `-9223372036854775808 <= v < 0`
                 */
                const randomNegative = tsql.decimal.sub(
                    /**
                     * `-9223372036854775808 < v <= 0`
                     */
                    tsql.decimal.floor(
                        tsql.decimal.mul(
                            randomDecimal,
                            tsql.decimalLiteral(
                                "-9223372036854775808",
                                65,
                                30
                            )
                        )
                    ),
                    tsql.decimalLiteral(1, 65, 30)
                );
                const randomBigIntSigned = tsql.if(
                    tsql.lt(
                        tsql.double.random(),
                        0.5
                    ),
                    tsql.castAsBigIntSigned(randomNonNegative),
                    tsql.castAsBigIntSigned(randomNegative)
                );

                return toSql(randomBigIntSigned.ast);
            } else {
                throw new Error(`RANDOM not implemented for ${typeHint}`);
            }
        },
        [tsql.OperatorType.ROUND] : ({operands}) => tsql.functionCall("ROUND", operands),
        [tsql.OperatorType.SIGN] : ({operands}) => tsql.functionCall("SIGN", operands),
        [tsql.OperatorType.SINE] : ({operands}) => tsql.functionCall("SIN", operands),
        [tsql.OperatorType.SQUARE_ROOT] : ({operands}) => tsql.functionCall("SQRT", operands),
        [tsql.OperatorType.TANGENT] : ({operands}) => tsql.functionCall("TAN", operands),
        [tsql.OperatorType.TRUNCATE] : ({operands}) => tsql.functionCall("TRUNCATE", operands),
        [tsql.OperatorType.INTEGER_REMAINDER] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                return tsql.AstUtil.insertBetween(operands, "%");
            } else {
                throw new Error(`INTEGER_REMAINDER not implemented for ${typeHint}`);
            }
        },

        /*
            Date and Time Functions
            https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html
        */
        [tsql.OperatorType.CURRENT_DATE] : () => tsql.functionCall(
            "CURRENT_DATE",
            []
        ),
        [tsql.OperatorType.CURRENT_TIMESTAMP_0] : () => tsql.functionCall(
            "CURRENT_TIMESTAMP",
            ["0"]
        ),
        [tsql.OperatorType.CURRENT_TIMESTAMP_1] : () => tsql.functionCall(
            "CURRENT_TIMESTAMP",
            ["1"]
        ),
        [tsql.OperatorType.CURRENT_TIMESTAMP_2] : () => tsql.functionCall(
            "CURRENT_TIMESTAMP",
            ["2"]
        ),
        [tsql.OperatorType.CURRENT_TIMESTAMP_3] : () => tsql.functionCall(
            "CURRENT_TIMESTAMP",
            ["3"]
        ),
        [tsql.OperatorType.EXTRACT_YEAR] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "YEAR FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_MONTH] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "MONTH FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_DAY] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "DAY FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_HOUR] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "HOUR FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_MINUTE] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "MINUTE FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_INTEGER_SECOND] : ({operands}) => tsql.functionCall(
            "EXTRACT",
            [
                [
                    "SECOND FROM",
                    operands[0]
                ]
            ]
        ),
        [tsql.OperatorType.EXTRACT_FRACTIONAL_SECOND_3] : ({operands}) => [
            tsql.functionCall(
                "EXTRACT",
                [
                    [
                        "SECOND FROM",
                        operands[0]
                    ]
                ]
            ),
            "+",
            tsql.functionCall(
                "FLOOR",
                [
                    [
                        tsql.functionCall(
                            "EXTRACT",
                            [
                                [
                                    "MICROSECOND FROM",
                                    operands[0]
                                ]
                            ]
                        ),
                        "/",
                        "1000e0"
                    ]
                ]
            ),
            "/",
            "1000e0"
        ],
        [tsql.OperatorType.LAST_DAY] : ({operands}) => tsql.functionCall(
            "LAST_DAY",
            operands
        ),
        [tsql.OperatorType.TIMESTAMPADD_YEAR] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "YEAR",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_MONTH] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "MONTH",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_DAY] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "DAY",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_HOUR] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "HOUR",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_MINUTE] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "MINUTE",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_SECOND] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "SECOND",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPADD_MILLISECOND] : ({operands}) => tsql.functionCall(
            "TIMESTAMPADD",
            [
                "MICROSECOND",
                [
                    operands[0],
                    "*",
                    "1000"
                ],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPDIFF_DAY] : ({operands}) => tsql.functionCall(
            "TIMESTAMPDIFF",
            [
                "DAY",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPDIFF_HOUR] : ({operands}) => tsql.functionCall(
            "TIMESTAMPDIFF",
            [
                "HOUR",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPDIFF_MINUTE] : ({operands}) => tsql.functionCall(
            "TIMESTAMPDIFF",
            [
                "MINUTE",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPDIFF_SECOND] : ({operands}) => tsql.functionCall(
            "TIMESTAMPDIFF",
            [
                "SECOND",
                operands[0],
                operands[1]
            ]
        ),
        [tsql.OperatorType.TIMESTAMPDIFF_MILLISECOND] : ({operands}) => tsql.functionCall(
            "CAST",
            [
                [
                    tsql.functionCall(
                        "TIMESTAMPDIFF",
                        [
                            "MICROSECOND",
                            operands[0],
                            operands[1]
                        ]
                    ),
                    "/ 1000.0 AS SIGNED INTEGER"
                ]
            ]
        ),
        [tsql.OperatorType.UNIX_TIMESTAMP_NOW] : ({}) => tsql.functionCall(
            "UNIX_TIMESTAMP",
            []
        ),
        /**
         * Assumes,
         * ```sql
         * @@session.time_zone = '+00:00'
         * ```
         *
         * This should already be done by `pool.acquire()`
         *
         * We **must not** use `CONVERT_TZ()` because it is not Y2038-safe!
         * + https://github.com/AnyhowStep/tsql/issues/131
         * + https://bugs.mysql.com/bug.php?id=71758
         */
        [tsql.OperatorType.UTC_STRING_TO_TIMESTAMP_CONSTRUCTOR] : ({operands}) => tsql.functionCall(
            "TIMESTAMP",
            operands
        ),

        /*
            Cast Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html
        */
        [tsql.OperatorType.CAST_AS_JSON] : ({operands : [arg]}) => tsql.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS JSON`
                ]
            ]
        ),
        [tsql.OperatorType.CAST_AS_BINARY] : ({operands : [arg]}) => tsql.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS BINARY`
                ]
            ]
        ),
        [tsql.OperatorType.CAST_AS_VARCHAR] : ({operands : [arg]}) => tsql.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS CHAR`
                ]
            ]
        ),
        [tsql.OperatorType.CAST_AS_DOUBLE] : ({operands : [x]}, toSql) => `((${toSql(x)}) + 0e0)`,
        [tsql.OperatorType.CAST_AS_DECIMAL] : ({operands : [arg, precision, scale]}, toSql) => tsql.functionCall(
            "CAST",
            [
                toSql(arg) + `AS DECIMAL(${toSql(precision)}, ${toSql(scale)})`
            ]
        ),
        [tsql.OperatorType.CAST_AS_BIGINT_SIGNED] : ({operands : [arg]}, toSql) => tsql.functionCall(
            "CAST",
            [
                toSql(arg) + `AS SIGNED INTEGER`
            ]
        ),

        /*
            Bit Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/bit-functions.html
        */
        [tsql.OperatorType.BITWISE_AND] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-and, then casts to unsigned.
                 * But we do not want that.
                 */
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, "&"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_AND not implemented for typeHint ${typeHint}`);
            }
        },
        [tsql.OperatorType.BITWISE_OR] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-or, then casts to unsigned.
                 * But we do not want that.
                 */
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, "|"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_OR not implemented for typeHint ${typeHint}`);
            }
        },
        [tsql.OperatorType.BITWISE_XOR] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-xor, then casts to unsigned.
                 * But we do not want that.
                 */
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, "^"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_XOR not implemented for typeHint ${typeHint}`);
            }
        },
        [tsql.OperatorType.BITWISE_NOT] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-not, then casts to unsigned.
                 * But we do not want that.
                 */
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            ["~", operands],
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_NOT not implemented for typeHint ${typeHint}`);
            }
        },
        [tsql.OperatorType.BITWISE_LEFT_SHIFT] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-left-shift, then casts to unsigned.
                 * But we do not want that.
                 */
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, "<<"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_LEFT_SHIFT not implemented for typeHint ${typeHint}`);
            }
        },
        [tsql.OperatorType.BITWISE_RIGHT_SHIFT] : ({operands, typeHint}) => {
            if (typeHint == tsql.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-right-shift, then casts to unsigned.
                 * But we do not want that.
                 */
                /*
                return tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, ">>"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );*/
                /**
                 * MySQL only supports unsigned right-shift.
                 * We want a signed right-shift.
                 *
                 * @see https://www.tutorialspoint.com/Bitwise-right-shift-operator-in-Java
                 */
                const unsignedRightShift = tsql.functionCall(
                    "CAST",
                    [
                        [
                            tsql.AstUtil.insertBetween(operands, ">>"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
                const signedRightShift = tsql.functionCall(
                    "CAST",
                    [
                        [
                            [
                                tsql.parentheses(
                                    tsql.AstUtil.insertBetween(operands, ">>"),
                                    false
                                ),
                                "|",
                                [
                                    "~",
                                    tsql.parentheses(
                                        ["18446744073709551615", ">>", operands[1]],
                                        false
                                    )
                                ]
                            ],
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
                return tsql.functionCall(
                    "IF",
                    [
                        [operands[0], ">= 0"],
                        unsignedRightShift,
                        signedRightShift
                    ]
                )
            } else {
                throw new Error(`BITWISE_RIGHT_SHIFT not implemented for typeHint ${typeHint}`);
            }
        },

        /*
            Aggregate (GROUP BY) Function Descriptions
            https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html
        */
        [tsql.OperatorType.AGGREGATE_COUNT_ALL] : () => tsql.functionCall("COUNT", ["*"]),
        [tsql.OperatorType.AGGREGATE_COUNT_EXPR] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    tsql.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return tsql.functionCall("COUNT", [["DISTINCT", expr]]);
                } else {
                    return tsql.functionCall("COUNT", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [tsql.OperatorType.AGGREGATE_AVERAGE] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    tsql.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return tsql.functionCall("AVG", [["DISTINCT", expr]]);
                } else {
                    return tsql.functionCall("AVG", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [tsql.OperatorType.AGGREGATE_MAX] : ({operands}) => {
            return tsql.functionCall("MAX", operands);
        },
        [tsql.OperatorType.AGGREGATE_MIN] : ({operands}) => {
            return tsql.functionCall("MIN", operands);
        },
        [tsql.OperatorType.AGGREGATE_SUM] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    tsql.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return tsql.functionCall("SUM", [["DISTINCT", expr]]);
                } else {
                    return tsql.functionCall("SUM", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [tsql.OperatorType.AGGREGATE_POPULATION_STANDARD_DEVIATION] : ({operands}) => {
            return tsql.functionCall("STDDEV_POP", operands);
        },
        [tsql.OperatorType.AGGREGATE_SAMPLE_STANDARD_DEVIATION] : ({operands}) => {
            return tsql.functionCall("STDDEV_SAMP", operands);
        },
        [tsql.OperatorType.AGGREGATE_POPULATION_VARIANCE] : ({operands}) => {
            return tsql.functionCall("VAR_POP", operands);
        },
        [tsql.OperatorType.AGGREGATE_SAMPLE_VARIANCE] : ({operands}) => {
            return tsql.functionCall("VAR_SAMP", operands);
        },
        [tsql.OperatorType.AGGREGATE_GROUP_CONCAT_DISTINCT] : ({operands}) => tsql.functionCall(
            "GROUP_CONCAT",
            [
                ["DISTINCT", operands[0]]
            ]
        ),
        [tsql.OperatorType.AGGREGATE_GROUP_CONCAT_ALL] : ({operands}) => tsql.functionCall(
            "GROUP_CONCAT",
            operands
        ),

        [tsql.OperatorType.EXISTS] : ({operands : [query]}, toSql) => {
            if (tsql.QueryBaseUtil.isAfterFromClause(query)) {
                //EXISTS(... FROM table)
                if (tsql.QueryBaseUtil.isAfterSelectClause(query)) {
                    //EXISTS(SELECT x FROM table)
                    return tsql.functionCall("EXISTS", [query]);
                } else {
                    //EXISTS(FROM table)
                    return tsql.functionCall("EXISTS", [
                        "SELECT 1 " + toSql(query)
                    ]);
                }
            } else {
                if (tsql.QueryBaseUtil.isAfterSelectClause(query)) {
                    //EXISTS(SELECT x)
                    return tsql.functionCall("EXISTS", [query]);
                } else {
                    throw new Error(`Query should have either FROM or SELECT clause`);
                }
            }
        },

        /*
            https://dev.mysql.com/doc/refman/5.7/en/information-functions.html

            Information Functions
        */
        [tsql.OperatorType.CURRENT_DATABASE] : () => tsql.functionCall(
            "DATABASE",
            []
        ),
        [tsql.OperatorType.CURRENT_USER] : () => tsql.functionCall(
            "CURRENT_USER",
            []
        ),

        /*
            Custom library functions

            These functions are not standard SQL,
            but can be implemented using standard SQL.
        */
        [tsql.OperatorType.THROW_IF_NULL] : ({operands : [arg]}) => {
            return tsql.functionCall("COALESCE", [arg, "(SELECT NULL UNION ALL SELECT NULL)"]);
        },
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
    parenthesesSqlfier : ({ast}, toSql, sqlfier) : string|tsql.AstArray|tsql.Parentheses|tsql.FunctionCall|tsql.LiteralValueNode => {
        if (!tsql.QueryBaseUtil.isQuery(ast)) {
            return tsql.AstUtil.toSqlAst(ast, sqlfier);
        }

        if (
            ast.compoundQueryClause != undefined ||
            ast.compoundQueryLimitClause != undefined ||
            ast.compoundQueryOrderByClause != undefined
        ) {
            /**
             * MySQL is **REALLY** inconsistent with what syntax they do and
             * do not allow for queries, depending on whether it's a regular SELECT
             * statement, or a subexpression...
             */
            const query = ast;

            const result = [
                "SELECT * FROM (",
                nonCompoundQueryToSql(
                    {
                        ...query,
                        compoundQueryClause : undefined,
                        compoundQueryLimitClause : undefined,
                        compoundQueryOrderByClause : undefined,
                    },
                    toSql,
                    false
                ),
                ") AS tmp"
            ];

            if (query.compoundQueryClause != undefined) {
                result.push(compoundQueryClauseToSql(query.compoundQueryClause, toSql).join(" "));
            }

            if (query.compoundQueryOrderByClause != undefined) {
                result.push(orderByClauseToSql(query.compoundQueryOrderByClause, undefined, toSql).join(" "));
            }

            if (query.compoundQueryLimitClause != undefined) {
                result.push(limitClauseToSql(query.compoundQueryLimitClause, toSql).join(" "));
            }

            return result;
        }

        return sqlfier.queryBaseSqlfier(ast, toSql, sqlfier);
    },
};
