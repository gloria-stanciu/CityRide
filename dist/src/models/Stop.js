"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const StopTime_1 = __importDefault(require("./StopTime"));
const Transfer_1 = __importDefault(require("./Transfer"));
const Feed_1 = __importDefault(require("./Feed"));
class Stop extends objection_1.Model {
}
exports.default = Stop;
Stop.tableName = 'stops';
Stop.modifiers = {
    idColumn() {
        return ['id', 'feed_id'];
    }
};
Stop.jsonSchema = {
    type: 'object',
    required: ['id', 'feedId', 'lat', 'long'],
    properties: {
        id: { type: 'string' },
        feedId: { type: 'string' },
        code: { type: 'string' },
        name: { type: 'string' },
        desc: { type: 'string' },
        lat: { type: 'string' },
        long: { type: 'string' },
        zoneId: { type: 'number' },
        stopUrl: { type: 'string' },
        locationType: {
            type: 'number',
            enum: [0, 1, 2, 3, 4]
        },
        parentStation: { type: 'string' },
        stopTimezone: { type: 'string' },
        wheelchairBoarding: {
            type: 'number',
            enum: [0, 1, 2]
        }
    },
};
Stop.relationMappings = () => ({
    stopTime: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: StopTime_1.default,
        join: {
            from: 'stops.id',
            to: 'stopTimes.stopId'
        }
    },
    transfer1: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Transfer_1.default,
        join: {
            from: 'stops.id',
            to: 'transfers.fromStopId'
        },
    },
    transfer2: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Transfer_1.default,
        join: {
            from: 'stops.id',
            to: 'transfers.toStopId'
        },
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'stops.feedId',
            to: 'feed.id'
        }
    },
});
//# sourceMappingURL=Stop.js.map