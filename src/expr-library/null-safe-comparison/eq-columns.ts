import {EqColumns, makeEqColumns} from "@tsql/tsql";
import {nullSafeEq} from "./null-safe-eq";

/**
 * Convenience function for,
 * ```ts
 *  tsql.and(
 *      tsql.nullSafeEq(column0, value0),
 *      tsql.nullSafeEq(column1, value1),
 *      tsql.nullSafeEq(column2, value2),
 *      //etc.
 *  );
 * ```
 *
 * -----
 *
 * It is recommended to **only** use this with **object literals**.
 * Excess property checks are disabled for non-object literals.
 * Even if they were enabled, it is possible to slip in extra properties.
 *
 * Extra properties are ignored during run-time but may indicate lapses in logic.
 *
 * -----
 *
 * Uses `nullSafeEq()` internally because a table
 * may have nullable columns.
 *
 * @param table - The table
 * @param columnsInput - The column values to compare against
 *
 */
export const eqColumns : EqColumns = makeEqColumns(
    nullSafeEq
);
