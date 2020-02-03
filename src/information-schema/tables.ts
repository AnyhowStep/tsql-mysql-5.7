import * as tsql from "@tsql/tsql";
import {dtBigIntUnsigned} from "../data-type";

export const TABLES = tsql.table("TABLES")
    .addColumns({
        TABLE_CATALOG : tsql.dtVarChar(512),
        TABLE_SCHEMA : tsql.dtVarChar(64),
        TABLE_NAME : tsql.dtVarChar(64),
        TABLE_TYPE : tsql.dtVarChar(64),
        ENGINE : tsql.dtVarChar(64).orNull(),
        VERSION : dtBigIntUnsigned().orNull(),
        ROW_FORMAT : tsql.dtVarChar(10).orNull(),
        TABLE_ROWS : dtBigIntUnsigned().orNull(),
        AVG_ROW_LENGTH : dtBigIntUnsigned().orNull(),
        DATA_LENGTH : dtBigIntUnsigned().orNull(),
        MAX_DATA_LENGTH : dtBigIntUnsigned().orNull(),
        INDEX_LENGTH : dtBigIntUnsigned().orNull(),
        DATA_FREE : dtBigIntUnsigned().orNull(),
        AUTO_INCREMENT : dtBigIntUnsigned().orNull(),
        CREATE_TIME : tsql.dtDateTime(3).orNull(),
        UPDATE_TIME : tsql.dtDateTime(3).orNull(),
        CHECK_TIME : tsql.dtDateTime(3).orNull(),
        TABLE_COLLATION : tsql.dtVarChar(32).orNull(),
        CHECKSUM : dtBigIntUnsigned().orNull(),
        CREATE_OPTIONS : tsql.dtVarChar(255).orNull(),
        TABLE_COMMENT : tsql.dtVarChar(2048),
    })
    .addCandidateKey(columns => [
        columns.TABLE_SCHEMA,
        columns.TABLE_NAME,
    ])
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema")
