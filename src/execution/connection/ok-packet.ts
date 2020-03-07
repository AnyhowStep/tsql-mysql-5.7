import * as squill from "@squill/squill";

export interface OkPacket {
    readonly insertId : number,
    readonly affectedRows : number,
    readonly warningCount : number,
    readonly changedRows : number,
    readonly message : string,
}

export function isOkPacket (mixed : unknown) : mixed is OkPacket {
    return squill.TypeUtil.isObjectWithOwnEnumerableKeys<OkPacket>()(
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
