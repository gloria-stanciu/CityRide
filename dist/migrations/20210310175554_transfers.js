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
        if (!(yield knex.schema.hasTable('transfers')))
            return yield knex.schema.createTable('transfers', (table) => {
                table.string('from_stop_id').notNullable().references('primary_key').inTable('stops').onDelete('CASCADE').index();
                table.string('trip_id').notNullable();
                table.string('to_stop_id').notNullable();
                table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
                table.integer('transfer_type'); //enum 0-3 https://gtfs.org/reference/static/#transferstxt
                table.integer('min_transfer_time');
                table.primary(['trip_id', 'feed_id', 'from_stop_id'], 'composite_primary_key');
                table.foreign(['trip_id', 'feed_id']).references(['id', 'feed_id']).inTable('trips').onDelete('CASCADE');
                table.foreign(['from_stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
                table.foreign(['to_stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('transfers');
    });
}
exports.down = down;
//# sourceMappingURL=20210310175554_transfers.js.map