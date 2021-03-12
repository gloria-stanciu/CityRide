"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Stop_1 = __importDefault(require("./Stop"));
const Trip_1 = __importDefault(require("./Trip"));
const Feed_1 = __importDefault(require("./Feed"));
class Transfer extends objection_1.Model {
}
exports.default = Transfer;
Transfer.tableName = 'transfers';
Transfer.modifiers = {
    idColumn() {
        return ['trip_id', 'feed_id', 'from_stop_id'];
    }
};
// https://gtfs.org/reference/static/#transferstxt
Transfer.jsonSchema = {
    type: 'object',
    required: ['trip_id', 'feed_id', 'from_stop_id'],
    properties: {
        fromStopId: { type: 'string' },
        tripId: { type: 'string' },
        toStopId: { type: 'string' },
        feedId: { type: 'string' },
        transferType: {
            type: 'number',
            enum: [0, 1, 2, 3]
        },
        minTransferTime: { type: 'number' },
    }
};
Transfer.relationMappings = () => ({
    stop1: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Stop_1.default,
        join: {
            from: 'transfers.fromStopId',
            to: 'stops.id'
        }
    },
    stop2: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Stop_1.default,
        join: {
            from: 'transfers.toStopId',
            to: 'stop.id'
        },
    },
    trip: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'transfers.tripId',
            to: 'trips.id'
        },
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'transfers.feedId',
            to: 'feed.id'
        },
    }
});
//# sourceMappingURL=Transfer.js.map