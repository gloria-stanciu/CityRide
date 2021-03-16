'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import {knexSnakeCaseMappers} from 'objection'
export default {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {    
        tableName: 'knex_migrations',
        directory: './migrations',
        extension: 'ts'
    },
    ...knexSnakeCaseMappers()
}