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
        if (!(yield knex.schema.hasTable('calendar_dates')))
            return yield knex.schema.createTable('calendar_dates', (table) => {
                table.string('id').notNullable();
                table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
                table.string('service_id');
                table.dateTime('date_time').notNullable();
                table.integer('exception_type').notNullable(); //enum 1 sau 2 https://gtfs.org/reference/static/#calendar_datestxt
                table.primary(['id', 'feed_id'], 'composite_primary_key');
                table.foreign(['service_id', 'feed_id']).references(['id', 'feed_id']).inTable('services').onDelete('CASCADE');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('calendar_dates');
    });
}
exports.down = down;
//# sourceMappingURL=20210310171804_calendar_dates.js.map