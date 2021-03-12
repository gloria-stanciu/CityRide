"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Feed_1 = __importDefault(require("./Feed"));
const Service_1 = __importDefault(require("./Service"));
class Calendar extends objection_1.Model {
}
exports.default = Calendar;
Calendar.tableName = 'calendar';
Calendar.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
Calendar.relationMappings = () => ({
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'calendars.feedId',
            to: 'feed.id'
        }
    },
    service: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Service_1.default,
        join: {
            from: 'calendars.serviceId',
            to: 'service.id'
        }
    }
});
//# sourceMappingURL=Calendar.js.map