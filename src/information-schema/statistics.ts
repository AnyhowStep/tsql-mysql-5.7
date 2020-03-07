import * as tm from "type-mapping";
import * as squill from "@squill/squill";
import {dtBigIntUnsigned} from "../data-type";

export const STATISTICS = squill.table("STATISTICS")
    .addColumns({
        TABLE_CATALOG : squill.dtVarChar(512),
        TABLE_SCHEMA : squill.dtVarChar(64),
        TABLE_NAME : squill.dtVarChar(64),
        NON_UNIQUE : squill.dtBoolean(),
        INDEX_SCHEMA : squill.dtVarChar(64),
        INDEX_NAME : squill.dtVarChar(64),
        SEQ_IN_INDEX : dtBigIntUnsigned(),
        COLUMN_NAME : squill.dtVarChar(64),
        COLLATION : squill.dtVarChar(1).orNull(),
        CARDINALITY : dtBigIntUnsigned().orNull(),
        SUB_PART : dtBigIntUnsigned().orNull(),
        PACKED : squill.dtVarChar(10).orNull(),
        NULLABLE : tm.or(
            tm.literal("YES", "NO"),
            squill.dtVarChar(3)
        ),
        INDEX_TYPE : tm.or(
            tm.literal("BTREE"),
            squill.dtVarChar(16)
        ),
        COMMENT : squill.dtVarChar(16).orNull(),
        INDEX_COMMENT : squill.dtVarChar(1024),
    })
    .disableInsert()
    .disableDelete()
    .removeAllMutable()
    .setSchemaName("information_schema");
