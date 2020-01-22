import * as tsql from "@tsql/tsql";

export interface OkPacket {
    readonly insertId : number,
    readonly affectedRows : number,
    readonly warningCount : number,
    readonly changedRows : number,
    readonly message : string,
}

export function isOkPacket (mixed : unknown) : mixed is OkPacket {
    return tsql.TypeUtil.isObjectWithOwnEnumerableKeys<OkPacket>()(
        mixed,
        [
            "insertId",
            "affectedRows",
            "warningCount",
            "changedRows",
            "message",
        ]
    );
}
