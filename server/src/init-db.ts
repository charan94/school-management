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
        "synchronize": process.env.IS_TESTING === 'true',
        "dropSchema": process.env.IS_TESTING === 'true',
        "logging": process.env.IS_TESTING === 'true',
        "subscribers": [
            "subscribers/**/*.ts"
        ],
        "entities": [
            "entities/**/*.ts"
        ],
        "migrations": [
            "migrations/**/*.ts"
        ]
    });
    return connection;
}