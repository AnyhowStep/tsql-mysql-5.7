import * as squill from "@squill/squill";
import {dtBigIntUnsigned} from "../data-type";

export const TABLES = squill.table("TABLES")
    .addColumns({
        TABLE_CATALOG : squill.dtVarChar(512),
        TABLE_SCHEMA : squill.dtVarChar(64),
        TABLE_NAME : squill.dtVarChar(64),
        TABLE_TYPE : squill.dtVarChar(64),
        ENGINE : squill.dtVarChar(64).orNull(),
        VERSION : dtBigIntUnsigned().orNull(),
        ROW_FORMAT : squill.dtVarChar(10).orNull(),
        TABLE_ROWS : dtBigIntUnsigned().orNull(),
        AVG_ROW_LENGTH : dtBigIntUnsigned().orNull(),
        DATA_LENGTH : dtBigIntUnsigned().orNull(),
        MAX_DATA_LENGTH : dtBigIntUnsigned().orNull(),
        INDEX_LENGTH : dtBigIntUnsigned().orNull(),
        DATA_FREE : dtBigIntUnsigned().orNull(),
        AUTO_INCREMENT : dtBigIntUnsigned().orNull(),
        CREATE_TIME : squill.dtDateTime(3).orNull(),
        UPDATE_TIME : squill.dtDateTime(3).orNull(),
        CHECK_TIME : squill.dtDateTime(3).orNull(),
        TABLE_COLLATION : squill.dtVarChar(32).orNull(),
        CHECKSUM : dtBigIntUnsigned().orNull(),
        CREATE_OPTIONS : squill.dtVarChar(255).orNull(),
        TABLE_COMMENT : squill.dtVarChar(2048),
    })
    .addCandidateKey(columns => [
        columns.TABLE_SCHEMA,
        columns.TABLE_NAME,
    ])
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema")
