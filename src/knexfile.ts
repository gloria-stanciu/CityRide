'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import { knexSnakeCaseMappers } from 'objection'

var connString

if (process.env.NODE_ENV === 'production') {
  // connString = process.env.DATABASE_URL
  connString = process.env.DATABASE_URL
}

export default {
  client: 'pg',
  connection: connString || process.env.DATABASE_URL,

  // host: hostName || process.env.RDS_HOSTNAME,
  // user: process.env.RDS_USERNAME,
  // password: process.env.RDS_PASSWORD,
  // port: process.env.RDS_PORT,
  // dbname: process.env.RDS_DB_NAME,
  ssl: { rejectUnauthorized: false },
  // connectTimeout: 90000,
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
}
