import * as tm from "type-mapping";
import * as squill from "@squill/squill";

/**
 * 1-byte integer.
 *
 * This corresponds to MySQL's `TINYINT UNSIGNED` data type.
 * + Min:   0;
 * + Max: 255; `(2^8)-1`
 */
export const dtTinyIntUnsigned = squill.makeIntegerDataType(tm.mysql.tinyIntUnsigned());

/**
 * 2-byte integer.
 *
 * This corresponds to MySQL's `SMALLINT UNSIGNED` data type.
 * + Min:      0;
 * + Max: 65,535; `(2^16)-1`
 */
export const dtSmallIntUnsigned = squill.makeIntegerDataType(tm.mysql.smallIntUnsigned());

/**
 * 3-byte integer.
 *
 * This corresponds to MySQL's `MEDIUMINT UNSIGNED` data type.
 * + Min:          0;
 * + Max: 16,777,215; `(2^24)-1`
 */
export const dtMediumIntUnsigned = squill.makeIntegerDataType(tm.mysql.mediumIntUnsigned());

/**
 * 4-byte integer.
 *
 * This corresponds to MySQL's `INT UNSIGNED` data type.
 * + Min:             0;
 * + Max: 4,294,967,295; `(2^32)-1`
 */
export const dtIntUnsigned = squill.makeIntegerDataType(tm.mysql.intUnsigned());

/**
 * 8-byte integer.
 *
 * This corresponds to MySQL's `BIGINT UNSIGNED` data type.
 * + Min:                          0;
 * + Max: 18,446,744,073,709,551,615; `(2^64)-1`
 */
export const dtBigIntUnsigned = squill.makeIntegerDataType(tm.mysql.bigIntUnsigned());
