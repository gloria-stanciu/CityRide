'use strict'

require('dotenv').config()
import Knex from 'knex'

import knexConfig from './knexfile'
import { Model } from 'objection'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import router from './modules/index'
import cors from 'cors'

const app = express()
const knex = Knex(knexConfig)

Model.knex(knex)

app.use(morgan('combined'))
app.use(helmet())
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/api', router)

async function main() {
  console.info('Loading...')
  console.info('Checking database connection!\n')
  try {
    const port = process.env.PORT || 3000
    await knex.raw('SELECT 1+1 AS RESULT')
    console.log("I'm here")

    app.listen(port, () => {
      console.log(`Server started: http://localhost:${port}/`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

main()

// tsc && node dist/index.js
