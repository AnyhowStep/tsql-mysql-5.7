import {EqPrimaryKeyOfTable, makeEqPrimaryKeyOfTable} from "@tsql/tsql";
import {nullSafeEq} from "./null-safe-eq";

/**
 * Convenience function for,
 * ```ts
 *  myQuery
 *      .where(() => tsql.and(
 *          tsql.nullSafeEq(src.dstPk0, dst.dstPk0),
 *          tsql.nullSafeEq(src.dstPk1, dst.dstPk1),
 *          tsql.nullSafeEq(src.dstPk2, dst.dstPk2),
 *          //etc.
 *      ));
 * ```
 * -----
 *
 * + The `src` does not need to have keys.
 * + The `dst` must have a primary key.
 * + The `src` must have columns **null-safe** comparable to columns of `dst`'s primary key.
 *
 * -----
 *
 * Uses `nullSafeEq()` internally because `src.dstPkX` may have nullable columns.
 *
 * @param src - A table that does not need keys
 * @param dst - The table with a primary key to compare against
 */
export const eqPrimaryKeyOfTable : EqPrimaryKeyOfTable = makeEqPrimaryKeyOfTable(
    nullSafeEq
);
