"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Agency_1 = __importDefault(require("./Agency"));
const Route_1 = __importDefault(require("./Route"));
const Trip_1 = __importDefault(require("./Trip"));
const Shape_1 = __importDefault(require("./Shape"));
const Stop_1 = __importDefault(require("./Stop"));
const Calendar_1 = __importDefault(require("./Calendar"));
const StopTime_1 = __importDefault(require("./StopTime"));
const Transfer_1 = __importDefault(require("./Transfer"));
class Feed extends objection_1.Model {
}
exports.default = Feed;
Feed.tableName = 'feed';
Feed.modifiers = {
    idColumn() {
        return 'id';
    }
};
Feed.relationMappings = () => ({
    agency: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Agency_1.default,
        join: {
            from: 'feed.id',
            to: 'agency.feedId'
        }
    },
    route: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Route_1.default,
        join: {
            from: 'feed.id',
            to: 'routes.feedId'
        }
    },
    trip: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'feed.id',
            to: 'trips.feedId'
        }
    },
    shape: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Shape_1.default,
        join: {
            from: 'feed.id',
            to: 'shapes.feedId'
        }
    },
    stop: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Stop_1.default,
        join: {
            from: 'feed.id',
            to: 'stops.feedId'
        }
    },
    calendar: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Calendar_1.default,
        join: {
            from: 'feed.id',
            to: 'calendar.feedId'
        }
    },
    stopTime: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: StopTime_1.default,
        join: {
            from: 'feed.id',
            to: 'stopTimes.feedId'
        }
    },
    tarnsfer: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Transfer_1.default,
        join: {
            from: 'feed.id',
            to: 'transfer.feedId'
        }
    },
});
//# sourceMappingURL=Feed.js.map