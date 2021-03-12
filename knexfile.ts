'use strict'

require('dotenv').config()
// require('ts-node/register');

const {knexSnakeCaseMappers} = require('objection')
module.exports = {
    client: 'postgresql',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false},
    },
    migrations: {    
        tableName: 'knex_migrations',
        directory: './src/migrations',
        extension: 'ts'
    },
    ...knexSnakeCaseMappers()
}