import * as tape from "tape";
import {unifiedTest} from "@tsql/tsql/unified-test";
import * as mysql from "../../../dist";

unifiedTest({
    pool : new mysql.Pool({
        host      : "localhost",
        database  : "typed-orm-test",
        user      : "typed-orm-test-admin",
        password  : "BARyJg48ItnwkjJy",
        charset   : mysql.CharSet.utf8mb4,
    }),
    tape,
});
