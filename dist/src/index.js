'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const knex_1 = __importDefault(require("knex"));
const bodyParser = require('body-parser');
// const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const morgan = require('morgan');
const helmet = require('helmet');
const lumie = require('lumie');
const path = require('path');
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const knex = knex_1.default(knexConfig);
Model.knex(knex);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(helmet());
// lumie.load(app, {
//     preURL: 'api',
//     verbose: true,
//     ignore: ['*.spec', '*.action', '*.validate'],
//     // permissions,
//     controllers_path: path.join(__dirname, 'controllers'),
//   })
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.info('Loading...');
        console.info('Checking database connection!\n');
        try {
            const port = process.env.PORT || 3000;
            yield knex.raw('SELECT 1+1 AS RESULT');
            console.log("I'm here");
            yield app.listen(port, () => {
                console.log(`Server started: http://localhost:${port}/`);
            });
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=index.js.map