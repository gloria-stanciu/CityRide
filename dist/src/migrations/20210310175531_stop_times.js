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
        if (!(yield knex.schema.hasTable('stop_times')))
            return yield knex.schema.createTable('stop_times', (table) => {
                table.string('trip_id').notNullable();
                table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
                table.dateTime('arrival_time');
                table.dateTime('departure_time');
                table.string('stop_id').notNullable();
                table.integer('stop_sequence').notNullable();
                table.string('stop_headsign');
                table.integer('pickup_type'); //enum 0-3 https://gtfs.org/reference/static/#stop_timestxt
                table.integer('dropoff_type'); //enum 0-3 https://gtfs.org/reference/static/#stop_timestxt
                table.integer('timepoint'); //enum 0 sau 1 https://gtfs.org/reference/static/#stop_timestxt
                table.string('shape_dist_traveled');
                table.primary(['trip_id', 'feed_id', 'stop_id'], 'composite_primary_key');
                table.foreign(['trip_id', 'feed_id']).references(['id', 'feed_id']).inTable('trips').onDelete('CASCADE');
                table.foreign(['stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('stop_times');
    });
}
exports.down = down;
//# sourceMappingURL=20210310175531_stop_times.js.map