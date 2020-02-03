import * as tsql from "@tsql/tsql";
import {dtBigIntUnsigned} from "../data-type";

export const KEY_COLUMN_USAGE = tsql.table("KEY_COLUMN_USAGE")
    .addColumns({
        CONSTRAINT_CATALOG : tsql.dtVarChar(512),
        CONSTRAINT_SCHEMA : tsql.dtVarChar(64),
        CONSTRAINT_NAME : tsql.dtVarChar(64),
        TABLE_CATALOG : tsql.dtVarChar(512),
        TABLE_SCHEMA : tsql.dtVarChar(64),
        TABLE_NAME : tsql.dtVarChar(64),
        COLUMN_NAME : tsql.dtVarChar(64),
        ORDINAL_POSITION : dtBigIntUnsigned(),
        POSITION_IN_UNIQUE_CONSTRAINT : dtBigIntUnsigned().orNull(),
        REFERENCED_TABLE_SCHEMA : tsql.dtVarChar(64).orNull(),
        REFERENCED_TABLE_NAME : tsql.dtVarChar(64).orNull(),
        REFERENCED_COLUMN_NAME : tsql.dtVarChar(64).orNull(),
    })
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema");
