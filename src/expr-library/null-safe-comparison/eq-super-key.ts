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
 * Uses `nullSafeEq()` internally because the super key of a table
 * may have nullable columns.
 *
 * @param table - The table with a candidate key
 * @param superKey - The super key values to compare against
 */
export const eqSuperKey : EqSuperKey = makeEqSuperKey(
    nullSafeEq
);
