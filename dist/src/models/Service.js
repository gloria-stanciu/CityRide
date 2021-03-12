"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const CalendarDate_1 = __importDefault(require("./CalendarDate"));
const Trip_1 = __importDefault(require("./Trip"));
const Calendar_1 = __importDefault(require("./Calendar"));
const Feed_1 = __importDefault(require("./Feed"));
class Service extends objection_1.Model {
}
exports.default = Service;
Service.tableName = 'services';
Service.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
Service.relationMappings = () => ({
    calendarDate: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: CalendarDate_1.default,
        join: {
            from: 'service.id',
            to: 'calendarDates.serviceId'
        }
    },
    trip: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'service.id',
            to: 'trip.serviceId'
        }
    },
    calendar: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Calendar_1.default,
        join: {
            from: 'service.id',
            to: 'calendar.serviceId'
        }
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'service.feedId',
            to: 'feed.id'
        }
    }
});
//# sourceMappingURL=Service.js.map