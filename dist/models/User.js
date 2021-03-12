"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Payment_1 = __importDefault(require("./Payment"));
class User extends objection_1.Model {
}
exports.default = User;
User.tableName = 'users';
User.modifiers = {
    idColumn() {
        return 'id';
    }
};
User.relationMappings = () => ({
    payment: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Payment_1.default,
        join: {
            from: 'users.id',
            to: 'payments.userId'
        }
    }
});
//# sourceMappingURL=User.js.map