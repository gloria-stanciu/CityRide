'use strict'

require('dotenv').config({ path: '../.env' })
// require('ts-node/register');

import { knexSnakeCaseMappers } from 'objection'

var hostName

if (process.env.NODE_ENV === 'production') {
  // connString = process.env.DATABASE_URL
  hostName = process.env.RDS_HOSTNAME
}

export default {
  client: 'pg',
  connection: {
    host: hostName || process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    dbname: process.env.RDS_DB_NAME,
    ssl: { rejectUnauthorized: false },
    connectTimeout: 90000,
  },
  pool: {
    min: 1,
    max: 20,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
}
