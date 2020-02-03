import * as tm from "type-mapping";
import * as tsql from "@tsql/tsql";
import {dtBigIntUnsigned} from "../data-type";

export const STATISTICS = tsql.table("STATISTICS")
    .addColumns({
        TABLE_CATALOG : tsql.dtVarChar(512),
        TABLE_SCHEMA : tsql.dtVarChar(64),
        TABLE_NAME : tsql.dtVarChar(64),
        NON_UNIQUE : tsql.dtBoolean(),
        INDEX_SCHEMA : tsql.dtVarChar(64),
        INDEX_NAME : tsql.dtVarChar(64),
        SEQ_IN_INDEX : dtBigIntUnsigned(),
        COLUMN_NAME : tsql.dtVarChar(64),
        COLLATION : tsql.dtVarChar(1).orNull(),
        CARDINALITY : dtBigIntUnsigned().orNull(),
        SUB_PART : dtBigIntUnsigned().orNull(),
        PACKED : tsql.dtVarChar(10).orNull(),
        NULLABLE : tm.or(
            tm.literal("YES", "NO"),
            tsql.dtVarChar(3)
        ),
        INDEX_TYPE : tm.or(
            tm.literal("BTREE"),
            tsql.dtVarChar(16)
        ),
        COMMENT : tsql.dtVarChar(16).orNull(),
        INDEX_COMMENT : tsql.dtVarChar(1024),
    })
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema");
