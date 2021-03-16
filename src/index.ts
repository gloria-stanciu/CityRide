'use strict'

require('dotenv').config()
import Knex from "knex";


import knexConfig from './knexfile'
import { Model } from 'objection'
import morgan from 'morgan'
import helmet from 'helmet'
import lumie from 'lumie'
import path from 'path';
import express from 'express'


const app = express();
const knex = Knex(knexConfig);

Model.knex(knex)

app.use(morgan('combined'))
app.use(helmet())

// lumie.load(app, {
//     preURL: 'api',
//     verbose: true,
//     ignore: ['*.spec', '*.action', '*.validate'],
//     // permissions,
//     controllers_path: path.join(__dirname, 'controllers'),
//   })

async function main(){
    console.info('Loading...')
    console.info('Checking database connection!\n')
    try{
        const port = process.env.PORT || 3000;
        await knex.raw('SELECT 1+1 AS RESULT')
        console.log("I'm here")

        app.listen(port, ()=>{
            console.log(`Server started: http://localhost:${port}/`)
        })
      }catch(err){
        console.log(err);
        process.exit(1);
      }
}

main()
// app.get('/', (req, res) => {
//     res.json({message: 'This is working!'});
// });
// app.listen(port, ()=>{
//     return console.log(`App is listening on port ${port}`);
// });