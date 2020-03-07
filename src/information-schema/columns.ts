import * as tm from "type-mapping";
import * as squill from "@squill/squill";
import {dtBigIntUnsigned} from "../data-type";

export const COLUMNS = squill.table("COLUMNS")
    .addColumns({
        TABLE_CATALOG : squill.dtVarChar(512),
        TABLE_SCHEMA : squill.dtVarChar(64),
        TABLE_NAME : squill.dtVarChar(64),
        COLUMN_NAME : squill.dtVarChar(64),
        ORDINAL_POSITION : dtBigIntUnsigned(),
        COLUMN_DEFAULT : squill.dtLongText().orNull(),
        IS_NULLABLE : tm.or(
            tm.literal("YES", "NO"),
            squill.dtVarChar(3)
        ),
        DATA_TYPE : squill.dtVarChar(64),
        CHARACTER_MAXIMUM_LENGTH : dtBigIntUnsigned().orNull(),
        CHARACTER_OCTET_LENGTH : dtBigIntUnsigned().orNull(),
        NUMERIC_PRECISION : dtBigIntUnsigned().orNull(),
        NUMERIC_SCALE : dtBigIntUnsigned().orNull(),
        DATETIME_PRECISION : dtBigIntUnsigned().orNull(),
        CHARACTER_SET_NAME : squill.dtVarChar(32).orNull(),
        COLLATION_NAME : squill.dtVarChar(32).orNull(),
        COLUMN_TYPE : squill.dtLongText(),
        COLUMN_KEY : squill.dtVarChar(3),
        EXTRA : tm.or(
            tm.literal(
                "auto_increment",
                "STORED GENERATED"
            ),
            squill.dtVarChar(30)
        ),
        PRIVILEGES : squill.dtVarChar(80),
        COLUMN_COMMENT : squill.dtVarChar(1024),
        /**
         * Seems to be an empty string when there is no generation expression
         */
        GENERATION_EXPRESSION : squill.dtLongText(),
    })
    .addCandidateKey(c => [
        c.TABLE_SCHEMA,
        c.TABLE_NAME,
        c.COLUMN_NAME,
    ])
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema");
