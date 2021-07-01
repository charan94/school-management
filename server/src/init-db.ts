/**
 * @file init-db.ts
 * @author K Sai Charan
*/

import { Connection, createConnection } from 'typeorm';

/**
 * Initilizes database connection.
 */
export async function init(): Promise<Connection> {

    const connection = await createConnection({
        database: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        "type": "mysql",
        "synchronize": false, //process.env.IS_TESTING === 'true',
        "dropSchema": false, //process.env.IS_TESTING === 'true',
        "logging": process.env.IS_TESTING === 'true',
        "subscribers": [
            "src/subscribers/**/*.ts"
        ],
        "entities": [
            "src/entities/**/*.ts"
        ],
        "migrations": [
            "src/migrations/**/*.ts"
        ]
    });

    if (process.env.IS_TESTING === 'true') {
        connection.runMigrations();
    }

    return connection;
}