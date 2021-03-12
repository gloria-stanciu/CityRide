"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Trip_1 = __importDefault(require("./Trip"));
const Feed_1 = __importDefault(require("./Feed"));
const ShapePoint_1 = __importDefault(require("./ShapePoint"));
class Shape extends objection_1.Model {
}
exports.default = Shape;
Shape.tableName = 'shapes';
Shape.modifiers = {
    idColumn() {
        return ['id', 'feedId'];
    }
};
Shape.relationMappings = () => ({
    trip: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Trip_1.default,
        join: {
            from: 'shapes.id',
            to: 'trips.shapeId'
        }
    },
    shapePoint: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: ShapePoint_1.default,
        join: {
            from: 'shapes.id',
            to: 'shapePoints.shapeId'
        }
    },
    feed: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Feed_1.default,
        join: {
            from: 'shapes.feedId',
            to: 'feed.id'
        }
    }
});
//# sourceMappingURL=Shape.js.map