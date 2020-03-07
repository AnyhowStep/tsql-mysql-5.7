import * as squill from "@squill/squill";
import {queryToSql, nonCompoundQueryToSql} from "./query-to-sql";
import {compoundQueryClauseToSql} from "./compound-query-clause-to-sql";
import {orderByClauseToSql} from "./order-by-clause-to-sql";
import {limitClauseToSql} from "./limit-clause-to-sql";

export const sqlfier : squill.Sqlfier = {
    identifierSqlfier : (identifierNode) => identifierNode.identifiers
        .map(squill.escapeIdentifierWithBackticks)
        .join("."),
    literalValueSqlfier : {
        [squill.LiteralValueType.DECIMAL] : ({literalValue, precision, scale}, toSql) => toSql(
            squill.unsafeCastAsDecimal(
                literalValue,
                precision,
                scale
            ).ast
        ),
        [squill.LiteralValueType.STRING] : ({literalValue}) => squill.cStyleEscapeString(literalValue),
        [squill.LiteralValueType.DOUBLE] : ({literalValue}) => {
            if (!isFinite(literalValue)) {
                throw new squill.DataOutOfRangeError({
                    message : `Literal ${literalValue} not allowed`,
                    /**
                     * @todo Figure out how to get the entire SQL, then throw?
                     */
                    sql : undefined,
                });
            }
            return squill.escapeValue(literalValue);
        },
        [squill.LiteralValueType.BIGINT_SIGNED] : ({literalValue}) => squill.escapeValue(literalValue),
        [squill.LiteralValueType.BOOLEAN] : ({literalValue}) => squill.escapeValue(literalValue),
        [squill.LiteralValueType.BUFFER] : ({literalValue}) => squill.escapeValue(literalValue),
        [squill.LiteralValueType.NULL] : ({literalValue}) => squill.escapeValue(literalValue),
        [squill.LiteralValueType.DATE_TIME] : ({literalValue}, toSql) => toSql(
            squill.utcStringToTimestamp(
                squill.DateTimeUtil.toSqlUtc(literalValue, 3)
            ).ast
        ),
    },
    operatorSqlfier : {
        /*
            Comparison Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html
        */
        [squill.OperatorType.BETWEEN_AND] : ({operands}) => [
            operands[0],
            "BETWEEN",
            operands[1],
            "AND",
            operands[2]
        ],
        [squill.OperatorType.NOT_BETWEEN_AND] : ({operands}) => [
            operands[0],
            "NOT BETWEEN",
            operands[1],
            "AND",
            operands[2]
        ],
        [squill.OperatorType.COALESCE] : ({operatorType, operands}) => squill.functionCall(operatorType, operands),
        [squill.OperatorType.EQUAL] : ({operands}) => squill.AstUtil.insertBetween(operands, "="),
        [squill.OperatorType.NULL_SAFE_EQUAL] : ({operands}) => squill.AstUtil.insertBetween(operands, "<=>"),
        [squill.OperatorType.NOT_NULL_SAFE_EQUAL] : ({operands}) => [
            "NOT",
            "(",
            squill.AstUtil.insertBetween(operands, "<=>"),
            ")"
        ],
        [squill.OperatorType.LESS_THAN] : ({operands}) => squill.AstUtil.insertBetween(operands, "<"),
        [squill.OperatorType.GREATER_THAN] : ({operands}) => squill.AstUtil.insertBetween(operands, ">"),
        [squill.OperatorType.LESS_THAN_OR_EQUAL] : ({operands}) => squill.AstUtil.insertBetween(operands, "<="),
        [squill.OperatorType.GREATER_THAN_OR_EQUAL] : ({operands}) => squill.AstUtil.insertBetween(operands, ">="),
        [squill.OperatorType.IN_ARRAY] : ({operands : [x, ...rest]}) => {
            return [
                x,
                squill.functionCall("IN", [...rest])
            ];
        },
        [squill.OperatorType.IN_QUERY] : ({operands : [x, y]}) => {
            /**
             * https://github.com/AnyhowStep/squill/issues/198
             *
             * Not a MySQL problem, but nice to have some consistency
             *
             * @todo https://github.com/AnyhowStep/squill/issues/227
             */
            let query = squill.Parentheses.IsParentheses(y) ?
                y.ast :
                y;
            if (!squill.QueryBaseUtil.isQuery(query)) {
                throw new Error(`Expected query for IN_QUERY`);
            }
            if (
                query.limitClause != undefined ||
                query.compoundQueryClause != undefined ||
                query.compoundQueryLimitClause != undefined ||
                query.compoundQueryOrderByClause != undefined
            ) {
                const derivedTable = squill.QueryBaseUtil.as(
                    query as squill.QueryBaseUtil.AfterSelectClause,
                    "tmp"
                );
                query = (
                    squill.QueryUtil.newInstance()
                    .from(derivedTable)
                    .select(columns => [
                        columns[
                            Object.keys(columns)[0] as keyof typeof columns
                        ]
                    ] as any)
                ) as unknown as squill.IQueryBase;
            }
            return [
                x,
                squill.functionCall("IN", [
                    query
                ])
            ];
        },
        [squill.OperatorType.NOT_IN_ARRAY] : ({operands : [x, ...rest]}) => {
            return [
                x,
                squill.functionCall("NOT IN", [...rest])
            ];
        },
        [squill.OperatorType.NOT_IN_QUERY] : ({operands : [x, y]}) => {
            /**
             * https://github.com/AnyhowStep/squill/issues/198
             *
             * Not a MySQL problem, but nice to have some consistency
             *
             * @todo https://github.com/AnyhowStep/squill/issues/227
             */
            let query = squill.Parentheses.IsParentheses(y) ?
                y.ast :
                y;
            if (!squill.QueryBaseUtil.isQuery(query)) {
                throw new Error(`Expected query for NOT_IN_QUERY`);
            }
            if (
                query.limitClause != undefined ||
                query.compoundQueryClause != undefined ||
                query.compoundQueryLimitClause != undefined ||
                query.compoundQueryOrderByClause != undefined
            ) {
                const derivedTable = squill.QueryBaseUtil.as(
                    query as squill.QueryBaseUtil.AfterSelectClause,
                    "tmp"
                );
                query = (
                    squill.QueryUtil.newInstance()
                    .from(derivedTable)
                    .select(columns => [
                        columns[
                            Object.keys(columns)[0] as keyof typeof columns
                        ]
                    ] as any)
                ) as unknown as squill.IQueryBase;
            }
            return [
                x,
                squill.functionCall("NOT IN", [
                    query
                ])
            ];
        },
        [squill.OperatorType.IS_NOT_NULL] : ({operands}) => [operands[0], "IS NOT NULL"],
        [squill.OperatorType.IS_NULL] : ({operands}) => [operands[0], "IS NULL"],
        [squill.OperatorType.IS_UNKNOWN] : ({operands}) => [operands[0], "IS UNKNOWN"],
        [squill.OperatorType.IS_NOT_UNKNOWN] : ({operands}) => [operands[0], "IS NOT UNKNOWN"],
        [squill.OperatorType.IS_TRUE] : ({operands}) => [operands[0], "IS TRUE"],
        [squill.OperatorType.IS_NOT_TRUE] : ({operands}) => [operands[0], "IS NOT TRUE"],
        [squill.OperatorType.IS_FALSE] : ({operands}) => [operands[0], "IS FALSE"],
        [squill.OperatorType.IS_NOT_FALSE] : ({operands}) => [operands[0], "IS NOT FALSE"],
        [squill.OperatorType.LIKE_ESCAPE] : ({operands : [expr, pattern, escapeChar]}) => [
            expr, "LIKE", pattern, "ESCAPE", escapeChar
        ],
        [squill.OperatorType.NOT_LIKE_ESCAPE] : ({operands : [expr, pattern, escapeChar]}) => [
            expr, "NOT LIKE", pattern, "ESCAPE", escapeChar
        ],
        [squill.OperatorType.NOT_EQUAL] : ({operands}) => squill.AstUtil.insertBetween(operands, "<>"),
        [squill.OperatorType.LEAST] : ({operatorType, operands}) => squill.functionCall(operatorType, operands),
        [squill.OperatorType.GREATEST] : ({operatorType, operands}) => squill.functionCall(operatorType, operands),

        /*
            Logical Operators
            https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html
        */
       [squill.OperatorType.AND] : ({operands}) => squill.AstUtil.insertBetween(operands, "AND"),
       [squill.OperatorType.OR] : ({operands}) => squill.AstUtil.insertBetween(operands, "OR"),
       [squill.OperatorType.NOT] : ({operands}) => [
           "NOT",
           operands[0]
       ],
       [squill.OperatorType.XOR] : ({operands}) => squill.AstUtil.insertBetween(operands, "XOR"),

        /*
            Control Flow Functions
            https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html
        */
        [squill.OperatorType.IF] : ({operands : [a, b, c]}) => [
            "CASE WHEN",
            a,
            "THEN",
            b,
            "ELSE",
            c,
            "END"
        ],
        [squill.OperatorType.IF_NULL] : ({operands}) => squill.functionCall("IFNULL", operands),
        [squill.OperatorType.NULL_IF_EQUAL] : ({operands}) => squill.functionCall("NULLIF", operands),

        /*
            String Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/string-functions.html
        */
        [squill.OperatorType.ASCII] : ({operands}) => squill.functionCall("ASCII", operands),
        [squill.OperatorType.BIN] : ({operands}) => squill.functionCall("BIN", operands),
        [squill.OperatorType.BIT_LENGTH] : ({operands}) => squill.functionCall("BIT_LENGTH", operands),
        [squill.OperatorType.CHAR_LENGTH] : ({operands}) => squill.functionCall("CHAR_LENGTH", operands),
        [squill.OperatorType.OCTET_LENGTH] : ({operands}) => squill.functionCall("OCTET_LENGTH", operands),
        [squill.OperatorType.CONCAT] : ({operands}) => squill.functionCall("CONCAT", operands),
        [squill.OperatorType.NULL_SAFE_CONCAT] : ({operands}) => squill.functionCall(
            "CONCAT",
            operands.map(operand => squill.functionCall("COALESCE", [operand, "''"]))
        ),
        [squill.OperatorType.CONCAT_WS] : ({operands}) => squill.functionCall("CONCAT_WS", operands),
        [squill.OperatorType.FROM_BASE64] : ({operands}) => squill.functionCall("FROM_BASE64", operands),
        [squill.OperatorType.HEX] : ({operands}) => squill.functionCall("HEX", operands),
        [squill.OperatorType.IN_STR] : ({operands}) => squill.functionCall("INSTR", operands),
        [squill.OperatorType.LPAD] : ({operands}) => squill.functionCall("LPAD", operands),
        [squill.OperatorType.RPAD] : ({operands}) => squill.functionCall("RPAD", operands),
        [squill.OperatorType.LTRIM] : ({operands}) => squill.functionCall("LTRIM", operands),
        [squill.OperatorType.RTRIM] : ({operands}) => squill.functionCall("RTRIM", operands),
        [squill.OperatorType.TRIM] : ({operands}) => squill.functionCall("TRIM", operands),
        [squill.OperatorType.POSITION] : ({operands}) => squill.functionCall("POSITION", [
            squill.AstUtil.insertBetween(operands, "IN")
        ]),
        [squill.OperatorType.REPEAT] : ({operands}) => squill.functionCall("REPEAT", operands),
        [squill.OperatorType.REPLACE] : ({operands}) => squill.functionCall("REPLACE", operands),
        [squill.OperatorType.REVERSE] : ({operands}) => squill.functionCall("REVERSE", operands),
        [squill.OperatorType.TO_BASE64] : ({operands}) => squill.functionCall("TO_BASE64", operands),
        [squill.OperatorType.UNHEX] : ({operands}) => squill.functionCall("UNHEX", operands),
        [squill.OperatorType.UPPER] : ({operands}) => squill.functionCall("UPPER", operands),
        [squill.OperatorType.LOWER] : ({operands}) => squill.functionCall("LOWER", operands),

        /*
            Arithmetic Operators
            https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html
        */
        [squill.OperatorType.ADDITION]: ({operands}) => squill.AstUtil.insertBetween(operands, "+"),
        [squill.OperatorType.SUBTRACTION]: ({operands}) => squill.AstUtil.insertBetween(operands, "-"),
        [squill.OperatorType.MULTIPLICATION]: ({operands}) => squill.AstUtil.insertBetween(operands, "*"),
        [squill.OperatorType.INTEGER_DIVISION]: ({operands}) => squill.AstUtil.insertBetween(operands, "DIV"),
        [squill.OperatorType.FRACTIONAL_DIVISION]: ({operands}) => squill.AstUtil.insertBetween(operands, "/"),
        [squill.OperatorType.UNARY_MINUS]: ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
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
        [squill.OperatorType.ABSOLUTE_VALUE] : ({operands}) => squill.functionCall("ABS", operands),
        [squill.OperatorType.ARC_COSINE] : ({operands}) => squill.functionCall("ACOS", operands),
        [squill.OperatorType.ARC_SINE] : ({operands}) => squill.functionCall("ASIN", operands),
        [squill.OperatorType.ARC_TANGENT] : ({operands}) => squill.functionCall("ATAN", operands),
        [squill.OperatorType.ARC_TANGENT_2] : ({operands}) => squill.functionCall("ATAN2", operands),
        [squill.OperatorType.CUBE_ROOT] : ({operands}) => squill.functionCall(
            "IF",
            [
                [operands[0], ">= 0"],
                squill.functionCall("POWER", [...operands, "1.0/3.0"]),
                [
                    "-",
                    squill.functionCall("POWER", [
                        ["-(", operands[0], ")"],
                        "1.0/3.0"
                    ])
                ]
            ]
        ),
        [squill.OperatorType.CEILING] : ({operands}) => squill.functionCall("CEILING", operands),
        [squill.OperatorType.COSINE] : ({operands}) => squill.functionCall("COS", operands),
        [squill.OperatorType.COTANGENT] : ({operands}) => squill.functionCall("COT", operands),
        [squill.OperatorType.DEGREES] : ({operands}) => squill.functionCall("DEGREES", operands),
        [squill.OperatorType.NATURAL_EXPONENTIATION] : ({operands}) => squill.functionCall("EXP", operands),
        [squill.OperatorType.FLOOR] : ({operands}) => squill.functionCall("FLOOR", operands),
        [squill.OperatorType.LN] : ({operands}) => squill.functionCall("LN", operands),
        [squill.OperatorType.LOG] : ({operands}) => squill.functionCall("LOG", operands),
        [squill.OperatorType.LOG2] : ({operands}) => squill.functionCall("LOG2", operands),
        [squill.OperatorType.LOG10] : ({operands}) => squill.functionCall("LOG10", operands),
        [squill.OperatorType.PI] : () => `3.141592653589793e0`, //e0 to make it a double
        [squill.OperatorType.POWER] : ({operands}) => squill.functionCall("POWER", operands),
        [squill.OperatorType.RADIANS] : ({operands}) => squill.functionCall("RADIANS", operands),
        [squill.OperatorType.RANDOM] : ({operands, typeHint}, toSql) => {
            if (typeHint == squill.TypeHint.DOUBLE) {
                return squill.functionCall("RAND", operands);
            } else if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
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
                const randomDecimal = squill.unsafeCastAsDecimal(
                    squill.double.random(),
                    65,
                    30
                );
                /**
                 * `0 <= v < 9223372036854775807`
                 */
                const randomNonNegative = squill.decimal.floor(
                    squill.decimal.mul(
                        randomDecimal,
                        squill.decimalLiteral(
                            "9223372036854775807",
                            65,
                            30
                        )
                    )
                );
                /**
                 * `-9223372036854775808 <= v < 0`
                 */
                const randomNegative = squill.decimal.sub(
                    /**
                     * `-9223372036854775808 < v <= 0`
                     */
                    squill.decimal.floor(
                        squill.decimal.mul(
                            randomDecimal,
                            squill.decimalLiteral(
                                "-9223372036854775808",
                                65,
                                30
                            )
                        )
                    ),
                    squill.decimalLiteral(1, 65, 30)
                );
                const randomBigIntSigned = squill.if(
                    squill.lt(
                        squill.double.random(),
                        0.5
                    ),
                    squill.unsafeCastAsBigIntSigned(randomNonNegative),
                    squill.unsafeCastAsBigIntSigned(randomNegative)
                );

                return toSql(randomBigIntSigned.ast);
            } else {
                throw new Error(`RANDOM not implemented for ${typeHint}`);
            }
        },
        //[squill.OperatorType.ROUND] : ({operands}) => squill.functionCall("ROUND", operands),
        [squill.OperatorType.SIGN] : ({operands}) => squill.functionCall("SIGN", operands),
        [squill.OperatorType.SINE] : ({operands}) => squill.functionCall("SIN", operands),
        [squill.OperatorType.SQUARE_ROOT] : ({operands}) => squill.functionCall("SQRT", operands),
        [squill.OperatorType.TANGENT] : ({operands}) => squill.functionCall("TAN", operands),
        //[squill.OperatorType.TRUNCATE] : ({operands}) => squill.functionCall("TRUNCATE", operands),
        [squill.OperatorType.INTEGER_REMAINDER] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                return squill.AstUtil.insertBetween(operands, "%");
            } else {
                throw new Error(`INTEGER_REMAINDER not implemented for ${typeHint}`);
            }
        },
        [squill.OperatorType.FRACTIONAL_REMAINDER] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.DOUBLE || typeHint == squill.TypeHint.DECIMAL) {
                return squill.AstUtil.insertBetween(operands, "%");
            } else {
                throw new Error(`FRACTIONAL_REMAINDER not implemented for ${typeHint}`);
            }
        },

        /*
            Date and Time Functions
            https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html
        */
        [squill.OperatorType.CURRENT_DATE] : () => squill.functionCall(
            "CURRENT_DATE",
            []
        ),
        [squill.OperatorType.CURRENT_TIMESTAMP_0] : () => squill.functionCall(
            "CURRENT_TIMESTAMP",
            ["0"]
        ),
        [squill.OperatorType.CURRENT_TIMESTAMP_1] : () => squill.functionCall(
            "CURRENT_TIMESTAMP",
            ["1"]
        ),
        [squill.OperatorType.CURRENT_TIMESTAMP_2] : () => squill.functionCall(
            "CURRENT_TIMESTAMP",
            ["2"]
        ),
        [squill.OperatorType.CURRENT_TIMESTAMP_3] : () => squill.functionCall(
            "CURRENT_TIMESTAMP",
            ["3"]
        ),
        [squill.OperatorType.EXTRACT_YEAR] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "YEAR FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_MONTH] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "MONTH FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_DAY] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "DAY FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_HOUR] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "HOUR FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_MINUTE] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "MINUTE FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_INTEGER_SECOND] : ({operands}) => squill.functionCall(
            "EXTRACT",
            [
                [
                    "SECOND FROM",
                    operands[0]
                ]
            ]
        ),
        [squill.OperatorType.EXTRACT_FRACTIONAL_SECOND_3] : ({operands}) => [
            squill.functionCall(
                "EXTRACT",
                [
                    [
                        "SECOND FROM",
                        operands[0]
                    ]
                ]
            ),
            "+",
            squill.functionCall(
                "FLOOR",
                [
                    [
                        squill.functionCall(
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
        [squill.OperatorType.LAST_DAY] : ({operands}) => squill.functionCall(
            "LAST_DAY",
            operands
        ),
        [squill.OperatorType.TIMESTAMPADD_YEAR] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "YEAR",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_MONTH] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "MONTH",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_DAY] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "DAY",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_HOUR] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "HOUR",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_MINUTE] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "MINUTE",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_SECOND] : ({operands}) => squill.functionCall(
            "TIMESTAMPADD",
            [
                "SECOND",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPADD_MILLISECOND] : ({operands}) => squill.functionCall(
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
        [squill.OperatorType.TIMESTAMPDIFF_DAY] : ({operands}) => squill.functionCall(
            "TIMESTAMPDIFF",
            [
                "DAY",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPDIFF_HOUR] : ({operands}) => squill.functionCall(
            "TIMESTAMPDIFF",
            [
                "HOUR",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPDIFF_MINUTE] : ({operands}) => squill.functionCall(
            "TIMESTAMPDIFF",
            [
                "MINUTE",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPDIFF_SECOND] : ({operands}) => squill.functionCall(
            "TIMESTAMPDIFF",
            [
                "SECOND",
                operands[0],
                operands[1]
            ]
        ),
        [squill.OperatorType.TIMESTAMPDIFF_MILLISECOND] : ({operands}) => squill.functionCall(
            "CAST",
            [
                [
                    squill.functionCall(
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
        [squill.OperatorType.UNIX_TIMESTAMP_NOW] : ({}) => squill.functionCall(
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
         * + https://github.com/AnyhowStep/squill/issues/131
         * + https://bugs.mysql.com/bug.php?id=71758
         */
        [squill.OperatorType.UTC_STRING_TO_TIMESTAMP_CONSTRUCTOR] : ({operands}) => squill.functionCall(
            "TIMESTAMP",
            operands
        ),

        /*
            Cast Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html
        */
        [squill.OperatorType.CAST_AS_JSON] : ({operands : [arg]}) => squill.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS JSON`
                ]
            ]
        ),
        [squill.OperatorType.CAST_AS_BINARY] : ({operands : [arg]}) => squill.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS BINARY`
                ]
            ]
        ),
        [squill.OperatorType.CAST_AS_VARCHAR] : ({operands : [arg]}) => squill.functionCall(
            "CAST",
            [
                [
                    arg,
                    `AS CHAR`
                ]
            ]
        ),
        [squill.OperatorType.CAST_AS_DOUBLE] : ({operands : [x]}, toSql) => `((${toSql(x)}) + 0e0)`,
        [squill.OperatorType.CAST_AS_DECIMAL] : ({operands : [arg, precision, scale]}, toSql) => squill.functionCall(
            "CAST",
            [
                toSql(arg) + `AS DECIMAL(${toSql(precision)}, ${toSql(scale)})`
            ]
        ),
        [squill.OperatorType.CAST_AS_BIGINT_SIGNED] : ({operands : [arg]}, toSql) => squill.functionCall(
            "CAST",
            [
                toSql(arg) + `AS SIGNED INTEGER`
            ]
        ),

        /*
            Bit Functions and Operators
            https://dev.mysql.com/doc/refman/8.0/en/bit-functions.html
        */
        [squill.OperatorType.BITWISE_AND] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-and, then casts to unsigned.
                 * But we do not want that.
                 */
                return squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, "&"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_AND not implemented for typeHint ${typeHint}`);
            }
        },
        [squill.OperatorType.BITWISE_OR] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-or, then casts to unsigned.
                 * But we do not want that.
                 */
                return squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, "|"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_OR not implemented for typeHint ${typeHint}`);
            }
        },
        [squill.OperatorType.BITWISE_XOR] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-xor, then casts to unsigned.
                 * But we do not want that.
                 */
                return squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, "^"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_XOR not implemented for typeHint ${typeHint}`);
            }
        },
        [squill.OperatorType.BITWISE_NOT] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-not, then casts to unsigned.
                 * But we do not want that.
                 */
                return squill.functionCall(
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
        [squill.OperatorType.BITWISE_LEFT_SHIFT] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-left-shift, then casts to unsigned.
                 * But we do not want that.
                 */
                return squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, "<<"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
            } else {
                throw new Error(`BITWISE_LEFT_SHIFT not implemented for typeHint ${typeHint}`);
            }
        },
        [squill.OperatorType.BITWISE_RIGHT_SHIFT] : ({operands, typeHint}) => {
            if (typeHint == squill.TypeHint.BIGINT_SIGNED) {
                /**
                 * MySQL does the bitwise-right-shift, then casts to unsigned.
                 * But we do not want that.
                 */
                /*
                return squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, ">>"),
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
                const unsignedRightShift = squill.functionCall(
                    "CAST",
                    [
                        [
                            squill.AstUtil.insertBetween(operands, ">>"),
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
                const signedRightShift = squill.functionCall(
                    "CAST",
                    [
                        [
                            [
                                squill.parentheses(
                                    squill.AstUtil.insertBetween(operands, ">>"),
                                    false
                                ),
                                "|",
                                [
                                    "~",
                                    squill.parentheses(
                                        ["18446744073709551615", ">>", operands[1]],
                                        false
                                    )
                                ]
                            ],
                            "AS SIGNED INTEGER"
                        ]
                    ]
                );
                return squill.functionCall(
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
        [squill.OperatorType.AGGREGATE_COUNT_ALL] : () => squill.functionCall("COUNT", ["*"]),
        [squill.OperatorType.AGGREGATE_COUNT_EXPR] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    squill.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return squill.functionCall("COUNT", [["DISTINCT", expr]]);
                } else {
                    return squill.functionCall("COUNT", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [squill.OperatorType.AGGREGATE_AVERAGE] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    squill.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return squill.functionCall("AVG", [["DISTINCT", expr]]);
                } else {
                    return squill.functionCall("AVG", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [squill.OperatorType.AGGREGATE_MAX] : ({operands}) => {
            return squill.functionCall("MAX", operands);
        },
        [squill.OperatorType.AGGREGATE_MIN] : ({operands}) => {
            return squill.functionCall("MIN", operands);
        },
        [squill.OperatorType.AGGREGATE_SUM] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    squill.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return squill.functionCall("SUM", [["DISTINCT", expr]]);
                } else {
                    return squill.functionCall("SUM", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [squill.OperatorType.AGGREGATE_SUM_AS_DECIMAL] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    squill.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return squill.functionCall("SUM", [["DISTINCT", expr]]);
                } else {
                    return squill.functionCall("SUM", [expr]);
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [squill.OperatorType.AGGREGATE_SUM_AS_BIGINT_SIGNED] : ({operands, operatorType}) => {
            if (operands.length == 2) {
                const [isDistinct, expr] = operands;
                if (
                    squill.LiteralValueNodeUtil.isLiteralValueNode(isDistinct) &&
                    isDistinct.literalValue === true
                ) {
                    return squill.functionCall(
                        "CAST",
                        [
                            [
                                squill.functionCall("SUM", [["DISTINCT", expr]]),
                                "AS SIGNED"
                            ]
                        ]
                    );
                } else {
                    return squill.functionCall(
                        "CAST",
                        [
                            [
                                squill.functionCall("SUM", [expr]),
                                "AS SIGNED"
                            ]
                        ]
                    );
                }
            } else {
                throw new Error(`${operatorType} only implemented for 2 args`);
            }
        },
        [squill.OperatorType.AGGREGATE_POPULATION_STANDARD_DEVIATION] : ({operands}) => {
            return squill.functionCall("STDDEV_POP", operands);
        },
        [squill.OperatorType.AGGREGATE_SAMPLE_STANDARD_DEVIATION] : ({operands}) => {
            return squill.functionCall("STDDEV_SAMP", operands);
        },
        [squill.OperatorType.AGGREGATE_POPULATION_VARIANCE] : ({operands}) => {
            return squill.functionCall("VAR_POP", operands);
        },
        [squill.OperatorType.AGGREGATE_SAMPLE_VARIANCE] : ({operands}) => {
            return squill.functionCall("VAR_SAMP", operands);
        },
        [squill.OperatorType.AGGREGATE_GROUP_CONCAT_DISTINCT] : ({operands}) => squill.functionCall(
            "GROUP_CONCAT",
            [
                ["DISTINCT", operands[0]]
            ]
        ),
        [squill.OperatorType.AGGREGATE_GROUP_CONCAT_ALL] : ({operands}) => squill.functionCall(
            "GROUP_CONCAT",
            operands
        ),

        [squill.OperatorType.EXISTS] : ({operands : [query]}, toSql) => {
            if (squill.QueryBaseUtil.isAfterFromClause(query)) {
                //EXISTS(... FROM table)
                if (squill.QueryBaseUtil.isAfterSelectClause(query)) {
                    //EXISTS(SELECT x FROM table)
                    return squill.functionCall("EXISTS", [query]);
                } else {
                    //EXISTS(FROM table)
                    return squill.functionCall("EXISTS", [
                        "SELECT 1 " + toSql(query)
                    ]);
                }
            } else {
                if (squill.QueryBaseUtil.isAfterSelectClause(query)) {
                    //EXISTS(SELECT x)
                    return squill.functionCall("EXISTS", [query]);
                } else {
                    throw new Error(`Query should have either FROM or SELECT clause`);
                }
            }
        },

        /*
            https://dev.mysql.com/doc/refman/5.7/en/information-functions.html

            Information Functions
        */
        [squill.OperatorType.CURRENT_SCHEMA] : () => squill.functionCall(
            "DATABASE",
            []
        ),
        [squill.OperatorType.CURRENT_USER] : () => "CURRENT_USER",

        /*
            Custom library functions

            These functions are not standard SQL,
            but can be implemented using standard SQL.
        */
        [squill.OperatorType.THROW_IF_NULL] : ({operands : [arg]}) => {
            return squill.functionCall("COALESCE", [arg, "(SELECT NULL UNION ALL SELECT NULL)"]);
        },
    },
    queryBaseSqlfier : (rawQuery, toSql) => {
        return queryToSql(rawQuery, toSql, false);
    },
    caseValueSqlfier : (node) => {
        const result : squill.Ast[] = [
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
        const result : squill.Ast[] = [
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
    parenthesesSqlfier : ({ast}, toSql, sqlfier) : string|squill.AstArray|squill.Parentheses|squill.FunctionCall|squill.LiteralValueNode => {
        if (!squill.QueryBaseUtil.isQuery(ast)) {
            return squill.AstUtil.toSqlAst(ast, sqlfier);
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
