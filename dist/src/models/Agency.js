"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Feed_1 = __importDefault(require("./Feed"));
const Payment_1 = __importDefault(require("./Payment"));
const Route_1 = __importDefault(require("./Route"));
class Agency extends objection_1.Model {
}
exports.default = Agency;
Agency.tableName = 'agency';
Agency.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
Agency.relationMappings = () => ({
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'agency.feedId',
            to: 'feed.id'
        }
    },
    payment: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Payment_1.default,
        join: {
            from: 'agency.id',
            to: 'payments.agencyId'
        }
    },
    route: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Route_1.default,
        join: {
            from: 'agency.id',
            to: 'routes.agencyId'
        }
    },
});
//# sourceMappingURL=Agency.js.map