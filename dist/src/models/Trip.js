"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Transfer_1 = __importDefault(require("./Transfer"));
const Feed_1 = __importDefault(require("./Feed"));
const Route_1 = __importDefault(require("./Route"));
const Service_1 = __importDefault(require("./Service"));
const Shape_1 = __importDefault(require("./Shape"));
class Trip extends objection_1.Model {
}
exports.default = Trip;
Trip.tableName = 'trips';
Trip.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
//https://gtfs.org/reference/static/#tripstxt
Trip.jsonSchema = {
    type: 'object',
    required: ['id', 'feedId'],
    properties: {
        id: { type: 'string' },
        feedId: { type: 'string' },
        routeId: { type: 'string' },
        serviceId: { type: 'string' },
        headsign: { type: 'string' },
        shortName: { type: 'string' },
        directionId: {
            type: 'number',
            enum: [0, 1]
        },
        blockId: { type: 'string' },
        shapeId: { type: 'string' },
        wheelchairAccesible: {
            type: 'number',
            enum: [0, 1, 2]
        },
        bikesAllowed: {
            type: 'number',
            enum: [0, 1, 2]
        },
        is_visible: { type: 'boolean', default: true }
    },
};
Trip.relationMappings = () => ({
    transfer: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Transfer_1.default,
        join: {
            from: 'trips.id',
            to: 'transfers.tripId'
        }
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'trips.feedId',
            to: 'feed.id'
        }
    },
    route: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Route_1.default,
        join: {
            from: 'trips.routeId',
            to: 'routes.id'
        }
    },
    service: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Service_1.default,
        join: {
            from: 'tripss.serviceId',
            to: 'service.id'
        }
    },
    shape: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Shape_1.default,
        join: {
            from: 'trips.shapeId',
            to: 'shapes.id'
        }
    },
});
//# sourceMappingURL=Trip.js.map