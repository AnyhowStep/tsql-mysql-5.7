At the moment, written with MySQL 5.7.26 in mind.

This is a MySQL 5.7 adapter for [`@squill/squill`](https://github.com/AnyhowStep/tsql)

-----

### TODO

+ Detailed usage instructions

```ts
import * as squill from "@squill/squill";
import * as mysql from "@squill/mysql-5.7";

const myTable = squill.table("myTable")
    .addColumns({
        myTableId : squill.dtBigIntSigned(),
        description : squill.dtVarChar(1024),
    })
    .setAutoIncrement(columns => columns.myTableId);

const pool = new mysql.Pool({
    host      : /*Some MySQL_HOST*/,
    database  : /*Some MYSQL_DATABASE*/,
    user      : /*Some MYSQL_USERNAME*/,
    password  : /*Some MYSQL_PASSWORD*/,
    charset   : mysql.CharSet.utf8mb4,
});

pool
    .acquire(connection => myTable
        .whereEqPrimaryKey({
            myTableId : 1337n,
        })
        .fetchOne(connection)
    )
    .then(
        (row) => {
            console.log(row.myTableId);
            console.log(row.description);
        },
        (err) => {
            if (squill.isSqlError(err)) {
                //Probably some error related to executing a SQL query
                //Maybe a RowNotFoundError
            } else {
                //Probably some other error
            }
        }
    );

/**
 * Build a query that may be used later.
 */
const myQuery = squill.from(myTable)
    .select(columns => [
        columns.myTableId
        squill.concat(
            "Description: ",
            columns.description
        ).as("labeledDescription"),
    ]);

pool
    .acquire(connection => myQuery
        .whereEqPrimaryKey(
            tables => tables.myTable,
            {
                myTableId : 1337n,
            }
        )
        .fetchOne(connection)
    )
    .then(
        (row) => {
            console.log(row.myTableId);
            console.log(row.labeledDescription);
        },
        (err) => {
            if (squill.isSqlError(err)) {
                //Probably some error related to executing a SQL query
                //Maybe a RowNotFoundError
            } else {
                //Probably some other error
            }
        }
    );

```
