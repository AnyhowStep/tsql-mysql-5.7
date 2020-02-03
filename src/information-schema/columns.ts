import * as tm from "type-mapping";
import * as tsql from "@tsql/tsql";
import {dtBigIntUnsigned} from "../data-type";

export const COLUMNS = tsql.table("COLUMNS")
    .addColumns({
        TABLE_CATALOG : tsql.dtVarChar(512),
        TABLE_SCHEMA : tsql.dtVarChar(64),
        TABLE_NAME : tsql.dtVarChar(64),
        COLUMN_NAME : tsql.dtVarChar(64),
        ORDINAL_POSITION : dtBigIntUnsigned(),
        COLUMN_DEFAULT : tsql.dtLongText().orNull(),
        IS_NULLABLE : tm.or(
            tm.literal("YES", "NO"),
            tsql.dtVarChar(3)
        ),
        DATA_TYPE : tsql.dtVarChar(64),
        CHARACTER_MAXIMUM_LENGTH : dtBigIntUnsigned().orNull(),
        CHARACTER_OCTET_LENGTH : dtBigIntUnsigned().orNull(),
        NUMERIC_PRECISION : dtBigIntUnsigned().orNull(),
        NUMERIC_SCALE : dtBigIntUnsigned().orNull(),
        DATETIME_PRECISION : dtBigIntUnsigned().orNull(),
        CHARACTER_SET_NAME : tsql.dtVarChar(32).orNull(),
        COLLATION_NAME : tsql.dtVarChar(32).orNull(),
        COLUMN_TYPE : tsql.dtLongText(),
        COLUMN_KEY : tsql.dtVarChar(3),
        EXTRA : tm.or(
            tm.literal(
                "auto_increment",
                "STORED GENERATED"
            ),
            tsql.dtVarChar(30)
        ),
        PRIVILEGES : tsql.dtVarChar(80),
        COLUMN_COMMENT : tsql.dtVarChar(1024),
        /**
         * Seems to be an empty string when there is no generation expression
         */
        GENERATION_EXPRESSION : tsql.dtLongText(),
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
