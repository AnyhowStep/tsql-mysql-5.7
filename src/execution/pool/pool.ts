import * as mysql from "mysql";
import * as tsql from "@tsql/tsql";
import {CharSet} from "../../char-set";
import {Connection} from "../connection";

export interface PoolArgs extends Omit<mysql.PoolConfig, "supportBigNumbers"|"bigNumberStrings"|"dateStrings"> {
    host      : string;
    port?     : number;
    database  : string;
    user      : string;
    password  : string;
    charset   : CharSet;
}
export class Pool implements tsql.IPool {
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
        });
    }

    acquire<ResultT>(callback: (connection: tsql.IConnection) => Promise<ResultT>): Promise<ResultT> {
        if (this.isDeallocated()) {
            return Promise.reject(new Error(`Pool has been deallocated`));
        }
        return new Promise<ResultT>((resolve, reject) => {
            this.poolImpl.getConnection((err, connectionImpl) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }

                /**
                 * @todo Always set timezone to +00:00?
                 */
                const connection = new Connection({
                    pool : this,
                    eventEmitters : new tsql.ConnectionEventEmitterCollection(this),
                    connectionImpl,
                    sharedConnectionInformation : {
                        transactionData : undefined,
                        savepointId : 0,
                    },
                });
                try {
                    callback(connection)
                        .then(
                            resolve,
                            reject
                        );
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    acquireTransaction<ResultT>(
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    acquireTransaction<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.ITransactionConnection, ResultT>
    ): Promise<ResultT>;
    acquireTransaction<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.ITransactionConnection, ResultT>]
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
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    acquireReadOnlyTransaction<ResultT>(
        minimumIsolationLevel: tsql.IsolationLevel,
        callback: tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>
    ): Promise<ResultT>;
    acquireReadOnlyTransaction<ResultT>(
        ...args : (
            | [tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
            | [tsql.IsolationLevel, tsql.LockCallback<tsql.IsolatedSelectConnection, ResultT>]
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

    readonly onInsert = new tsql.PoolEventEmitter<tsql.IInsertEvent<tsql.ITable<tsql.TableData>>>();
    readonly onInsertOne = new tsql.PoolEventEmitter<tsql.IInsertOneEvent<tsql.ITable<tsql.TableData>>>();
    readonly onInsertAndFetch = new tsql.PoolEventEmitter<tsql.IInsertAndFetchEvent<tsql.ITable<tsql.TableData>>>();

    readonly onReplace = new tsql.PoolEventEmitter<tsql.IReplaceEvent<tsql.ITable<tsql.TableData>>>();
    readonly onReplaceOne = new tsql.PoolEventEmitter<tsql.IReplaceOneEvent<tsql.ITable<tsql.TableData>>>();

    readonly onUpdate = new tsql.PoolEventEmitter<tsql.IUpdateEvent<tsql.ITable<tsql.TableData>>>();
    readonly onUpdateAndFetch = new tsql.PoolEventEmitter<tsql.IUpdateAndFetchEvent<tsql.ITable<tsql.TableData>>>();

    readonly onDelete = new tsql.PoolEventEmitter<tsql.IDeleteEvent<tsql.ITable<tsql.TableData>>>();
}
