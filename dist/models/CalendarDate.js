"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Feed_1 = __importDefault(require("./Feed"));
const Service_1 = __importDefault(require("./Service"));
class CalendarDate extends objection_1.Model {
}
exports.default = CalendarDate;
CalendarDate.tableName = 'calendarDates';
CalendarDate.modifiers = {
    idColumn() {
        return ['id', 'feed_id'];
    }
};
CalendarDate.jsonSchema = {
    type: 'object',
    required: ['id', 'feedId', 'dateTime', 'exceptionDate'],
    properties: {
        id: { type: 'string' },
        feedId: { type: 'string' },
        serviceId: { type: 'string' },
        dateTime: { type: 'date' },
        exceptionDate: {
            type: 'number',
            // https://gtfs.org/reference/static/#calendar_datestxt
            enum: [1, 2]
        },
    },
};
CalendarDate.relationMappings = () => ({
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'calendarDates.feedId',
            to: 'feed.id'
        }
    },
    service: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Service_1.default,
        join: {
            from: 'calendarDates.serviceId',
            to: 'services.id'
        },
    }
});
//# sourceMappingURL=CalendarDate.js.map