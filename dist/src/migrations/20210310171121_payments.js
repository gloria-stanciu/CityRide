"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield knex.schema.hasTable('payments')))
            return yield knex.schema.createTable('payments', (table) => {
                table.increments('id').notNullable().primary();
                table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
                table.string('agency_id').notNullable();
                table.string('feed_id').notNullable();
                table.float('fare').notNullable();
                table.integer('currency_id').notNullable().references('id').inTable('currency').onDelete('CASCADE').index();
                table.dateTime('date_time');
                table.foreign(['agency_id', 'feed_id']).references(['id', 'feed_id']).inTable('agency').onDelete('CASCADE');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('payments');
    });
}
exports.down = down;
//# sourceMappingURL=20210310171121_payments.js.map