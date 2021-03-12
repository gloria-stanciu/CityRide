"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Shape_1 = __importDefault(require("./Shape"));
class ShapePoint extends objection_1.Model {
}
exports.default = ShapePoint;
ShapePoint.tableName = 'shapes';
ShapePoint.modifiers = {
    idColumn() {
        return 'id';
    }
};
ShapePoint.relationMappings = () => ({
    shape: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Shape_1.default,
        join: {
            from: 'shapePoints.shapeId',
            to: 'shapes.id'
        }
    }
});
//# sourceMappingURL=ShapePoint.js.map