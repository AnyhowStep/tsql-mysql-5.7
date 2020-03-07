import * as squill from "@squill/squill";
import {dtBigIntUnsigned} from "../data-type";

export const KEY_COLUMN_USAGE = squill.table("KEY_COLUMN_USAGE")
    .addColumns({
        CONSTRAINT_CATALOG : squill.dtVarChar(512),
        CONSTRAINT_SCHEMA : squill.dtVarChar(64),
        CONSTRAINT_NAME : squill.dtVarChar(64),
        TABLE_CATALOG : squill.dtVarChar(512),
        TABLE_SCHEMA : squill.dtVarChar(64),
        TABLE_NAME : squill.dtVarChar(64),
        COLUMN_NAME : squill.dtVarChar(64),
        ORDINAL_POSITION : dtBigIntUnsigned(),
        POSITION_IN_UNIQUE_CONSTRAINT : dtBigIntUnsigned().orNull(),
        REFERENCED_TABLE_SCHEMA : squill.dtVarChar(64).orNull(),
        REFERENCED_TABLE_NAME : squill.dtVarChar(64).orNull(),
        REFERENCED_COLUMN_NAME : squill.dtVarChar(64).orNull(),
    })
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema");
