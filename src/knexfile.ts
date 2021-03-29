'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import { knexSnakeCaseMappers } from 'objection'

var connString

if (process.env.NODE_ENV === 'production') {
  connString = process.env.DATABASE_URL
}

export default {
  client: 'postgresql',
  connection: connString || {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
}
