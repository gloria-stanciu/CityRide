"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Trip_1 = __importDefault(require("./Trip"));
const Feed_1 = __importDefault(require("./Feed"));
const Stop_1 = __importDefault(require("./Stop"));
class StopTime extends objection_1.Model {
}
exports.default = StopTime;
StopTime.tablename = 'stopTimes';
StopTime.modifiers = {
    idColumn() {
        return ['trip_id', 'feed_id', 'stop_id'];
    }
};
// https://gtfs.org/reference/static/#stop_timestxt
StopTime.jsonSchema = {
    type: 'object',
    required: ['trip_id', 'feed_id', 'stop_id'],
    properties: {
        tripId: { type: 'string' },
        feedId: { type: 'string' },
        arrivalTime: { type: 'date' },
        departureTime: { type: 'date' },
        stopId: { type: 'string' },
        stopSequence: { type: 'number' },
        stopHeadsign: { type: 'string' },
        pickupType: {
            type: 'number',
            enum: [0, 1, 2, 3]
        },
        dropoffType: {
            type: 'number',
            enum: [0, 1, 2, 3]
        },
        timepoint: {
            type: 'number',
            enum: [0, 1]
        },
        shapeDistTraveled: { type: 'string' },
    },
};
StopTime.relationMappings = () => ({
    trip: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'stopTimes.tripId',
            to: 'trips.id'
        }
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'stopTimes.feedId',
            to: 'feed.id'
        },
    },
    stop: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Stop_1.default,
        join: {
            from: 'stopTimes.stopId',
            to: 'stops.id'
        },
    }
});
//# sourceMappingURL=StopTime.js.map