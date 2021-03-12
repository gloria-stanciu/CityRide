"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Trip_1 = __importDefault(require("./Trip"));
const Agency_1 = __importDefault(require("./Agency"));
const Feed_1 = __importDefault(require("./Feed"));
class Routes extends objection_1.Model {
}
exports.default = Routes;
Routes.tableName = 'routes';
Routes.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
Routes.jsonSchema = {
    type: 'object',
    required: ['id', 'feedId', 'agencyId'],
    properties: {
        id: { type: 'string' },
        feedId: { type: 'string' },
        agencyId: { type: 'string' },
        shortName: { type: 'string' },
        longName: { type: 'string' },
        desc: { type: 'string' },
        type: {
            type: 'number',
            //https://gtfs.org/reference/static/#routestxt
            enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        url: { type: 'string' },
        color: { type: 'string' },
        textColor: { type: 'string' }
    },
};
Routes.relationMappings = () => ({
    trip: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'routes.id',
            to: 'trips.routeId'
        }
    },
    agency: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Agency_1.default,
        join: {
            from: 'routes.agencyId',
            to: 'agency.id'
        }
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'routes.feedId',
            to: 'feed.id'
        }
    },
});
//# sourceMappingURL=Route.js.map