'use strict'

require('dotenv').config()
// require('ts-node/register');

import {knexSnakeCaseMappers} from 'objection'
module.exports = {
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