"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const Agency_1 = __importDefault(require("./Agency"));
const Currency_1 = __importDefault(require("./Currency"));
class Payment extends objection_1.Model {
}
exports.default = Payment;
Payment.tableName = 'payments';
Payment.modifiers = {
    idColumn() {
        return 'id';
    }
};
Payment.relationMappings = () => ({
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.default,
        join: {
            from: 'payments.userId',
            to: 'users.id'
        }
    },
    agency: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Agency_1.default,
        join: {
            from: 'payments.agencyId',
            to: 'agency.id'
        }
    },
    currency: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Currency_1.default,
        join: {
            from: 'payments.currencyId',
            to: 'currency.id'
        }
    }
});
//# sourceMappingURL=Payment.js.map