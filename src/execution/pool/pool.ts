import * as mysql from "mysql";
import * as squill from "@squill/squill";
import {CharSet} from "../../char-set";
import {Connection} from "../connection";

export interface PoolArgs extends Omit<
    mysql.PoolConfig,
    | "supportBigNumbers"
    | "bigNumberStrings"
    | "dateStrings"
    | "timezone"
> {
    host      : string;
    port?     : number;
    database  : string;
    user      : string;
    password  : string;
    charset   : CharSet;
}
export class Pool implements squill.IPool {
    private poolImpl : mysql.Pool;

    constructor (args : PoolArgs) {
        this.poolImpl = mysql.createPool({
            ...args,
            supportBigNumbers : true,
            /*
                Enabling both supportBigNumbers and bigNumberStrings
                forces big numbers (BIGINT and DECIMAL columns) to
                be always returned as JavaScript String objects.
            */
            bigNumberStrings : true,
            /*
                Force date types (TIMESTAMP, DATETIME, DATE) to be returned
                as strings rather than inflated into JavaScript Date objects.
            */
            dateStrings : true,

            timezone : "UTC",
        });
    }

    acquire<ResultT>(callback: (connection: squill.IConnection) => Promise<ResultT>): Promise<ResultT> {
        if (this.isDeallocated()) {
            return Promise.reject(new Error(`Pool has been deallocated`));
        }
        return new Promise<ResultT>((resolve, reject) => {
            this.poolImpl.getConnection((getConnectionError, connectionImpl) => {
                if (getConnectionError != undefined) {
                    reject(getConnectionError);
                    return;
                }

                const connection = new Connection({
                    pool : this,
                    eventEmitters : new squill.ConnectionEventEmitterCollection(this),
                    connectionImpl,
                    asyncQueue : undefined,
                    sharedConnectionInformation : {
                        transactionData : undefined,
                        savepointId : 0,
                    },
                });
                connection.rawQuery("SET @@session.time_zone = '+00:00'")
                    .then(
                        () => {
                            try {
                                callback(connection)
                                    .then(
                                        (result) => {
                                            connection.deallocate()
                                                .then(
                                                    () => resolve(result),
                                                    (_deallocateErr) => {
                                                        /**
                                                         * @todo Handle deallocate error?
                                                         */
                                                        resolve(result);
                                                    }
                                                );
                                        },
                                        (asyncCallbackError) => {
                                            connection.deallocate()
                                                .then(
                                                    () => reject(asyncCallbackError),
                                                    (_deallocateErr) => {
                                                        /**
                                                         * @todo Handle deallocate error?
                                                         */
                                                        reject(asyncCallbackError);
                                                    }
                                                );
                                        }
                                    );
                            } catch (syncCallbackError) {
                                connection.deallocate()
                                    .then(
                                        () => reject(syncCallbackError),
                                        (_deallocateErr) => {
                                            /**
                                             * @todo Handle deallocate error?
                                             */
                                            reject(syncCallbackError);
                                        }
                                    );
                            }
                        },
                        (setTimeZoneError) => {
                            connection.deallocate()
                                .then(
                                    () => reject(setTimeZoneError),
                                    (_deallocateErr) => {
                                        /**
                                         * @todo Handle deallocate error?
                                         */
                                        reject(setTimeZoneError);
                                    }
                                );
                        }
                    );
            });
        });
    }

    acquireTransaction<ResultT>(
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    acquireTransaction<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    acquireTransaction<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.ITransactionConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.ITransactionConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.acquire((connection) => {
            /**
             * TS has weird narrowing behaviours
             */
            if (args.length == 1) {
                return connection.transaction(...args);
            } else {
                return connection.transaction(...args);
            }
        });
    }

    acquireReadOnlyTransaction<ResultT>(
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    acquireReadOnlyTransaction<ResultT>(
        minimumIsolationLevel: squill.IsolationLevel,
        callback: squill.LockCallback<squill.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    acquireReadOnlyTransaction<ResultT>(
        ...args : (
            | [squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
            | [squill.IsolationLevel, squill.LockCallback<squill.IsolatedSelectConnection, ResultT>]
        )
    ): Promise<ResultT> {
        return this.acquire((connection) => {
            /**
             * TS has weird narrowing behaviours
             */
            if (args.length == 1) {
                return connection.readOnlyTransaction(...args);
            } else {
                return connection.readOnlyTransaction(...args);
            }
        });
    }
    private shouldDisconnect = false;
    disconnect(): Promise<void> {
        this.shouldDisconnect = true;
        return new Promise((resolve, reject) => {
            this.poolImpl.end((err) => {
                if (err == undefined) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
    isDeallocated(): boolean {
        return this.shouldDisconnect;
    }

    readonly onInsert = new squill.PoolEventEmitter<squill.IInsertEvent<squill.ITable<squill.TableData>>>();
    readonly onInsertOne = new squill.PoolEventEmitter<squill.IInsertOneEvent<squill.ITable<squill.TableData>>>();
    readonly onInsertAndFetch = new squill.PoolEventEmitter<squill.IInsertAndFetchEvent<squill.ITable<squill.TableData>>>();
    readonly onInsertSelect = new squill.PoolEventEmitter<squill.IInsertSelectEvent<squill.ITable<squill.TableData>>>();

    readonly onReplace = new squill.PoolEventEmitter<squill.IReplaceEvent<squill.ITable<squill.TableData>>>();
    readonly onReplaceOne = new squill.PoolEventEmitter<squill.IReplaceOneEvent<squill.ITable<squill.TableData>>>();
    readonly onReplaceSelect = new squill.PoolEventEmitter<squill.IReplaceSelectEvent<squill.ITable<squill.TableData>>>();

    readonly onUpdate = new squill.PoolEventEmitter<squill.IUpdateEvent<squill.ITable<squill.TableData>>>();
    readonly onUpdateAndFetch = new squill.PoolEventEmitter<squill.IUpdateAndFetchEvent<squill.ITable<squill.TableData>>>();

    readonly onDelete = new squill.PoolEventEmitter<squill.IDeleteEvent<squill.ITable<squill.TableData>>>();
}
