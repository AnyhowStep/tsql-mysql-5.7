import {EqSuperKey, makeEqSuperKey} from "@tsql/tsql";
import {nullSafeEq} from "./null-safe-eq";

/**
 * Convenience function for,
 * ```ts
 *  tsql.and(
 *      tsql.nullSafeEq(candidateKeyColumn0, value0),
 *      tsql.nullSafeEq(candidateKeyColumn1, value1),
 *      tsql.nullSafeEq(candidateKeyColumn2, value2),
 *      tsql.nullSafeEq(nonCandidateKeyColumn0, value3),
 *      tsql.nullSafeEq(nonCandidateKeyColumn1, value4),
 *      tsql.nullSafeEq(nonCandidateKeyColumn2, value5),
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
 * Uses `nullSafeEq()` internally because the super key of a table
 * may have nullable columns.
 *
 * @param table - The table with a candidate key
 * @param superKeyInput - The super key values to compare against
 */
export const eqSuperKey : EqSuperKey = makeEqSuperKey(
    nullSafeEq
);
