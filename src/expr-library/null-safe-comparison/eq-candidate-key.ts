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
 * Uses `nullSafeEq()` internally because the candidate key of a table
 * may have nullable columns.
 *
 * @param table - The table with a candidate key
 * @param candidateKey - The candidate key values to compare against
 */
export const eqCandidateKey : EqCandidateKey = makeEqCandidateKey(
    nullSafeEq
);
