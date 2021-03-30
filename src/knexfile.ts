'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import { knexSnakeCaseMappers } from 'objection'

var connString

if (process.env.NODE_ENV === 'production') {
  connString = process.env.DATABASE_URL
}

export default {
  client: 'pg',
  connection: connString || {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },

  // host: hostName || process.env.RDS_HOSTNAME,
  // user: process.env.RDS_USERNAME,
  // password: process.env.RDS_PASSWORD,
  // port: process.env.RDS_PORT,
  // dbname: process.env.RDS_DB_NAME,
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
}
