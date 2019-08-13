import {EqCandidateKey, makeEqCandidateKey} from "@tsql/tsql";
import {nullSafeEq} from "./null-safe-eq";

/**
 * Convenience function for,
 * ```ts
 *  tsql.and(
 *      tsql.nullSafeEq(candidateKeyColumn0, value0),
 *      tsql.nullSafeEq(candidateKeyColumn1, value1),
 *      tsql.nullSafeEq(candidateKeyColumn2, value2)
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
 * Excess properties are especially dangerous for this function.
 *
 * If your `candidateKeyInput` is actually a super key of two candidate keys,
 * then the candidate key this function compares against is arbitrary.
 *
 * The extra properties will be discarded.
 *
 * If you want to compare against a super key, use `eqSuperKey()` instead.
 *
 * -----
 *
 * Uses `nullSafeEq()` internally because the candidate key of a table
 * may have nullable columns.
 *
 * @param table - The table with a candidate key
 * @param candidateKeyInput - The candidate key values to compare against
 */
export const eqCandidateKey : EqCandidateKey = makeEqCandidateKey(
    nullSafeEq
);
