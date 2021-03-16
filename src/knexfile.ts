'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import {knexSnakeCaseMappers} from 'objection'
export default {
    client: 'postgresql',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false},
    },
    migrations: {    
        tableName: 'knex_migrations',
        directory: './migrations',
        extension: 'ts'
    },
    ...knexSnakeCaseMappers()
}