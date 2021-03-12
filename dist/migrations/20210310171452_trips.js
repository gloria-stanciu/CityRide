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
        if (!(yield knex.schema.hasTable('trips')))
            return yield knex.schema.createTable('trips', (table) => {
                table.string('id').notNullable();
                table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
                table.string('route_id');
                table.string('service_id');
                table.string('headsign');
                table.string('short_name');
                table.integer('direction_id');
                table.string('block_id');
                table.string('shape_id');
                table.integer('wheelchair_accessible'); //enum 0, 1 sau 2
                table.integer('bikes_allowed'); //enum 0, 1 sau 2
                table.boolean('is_visible').defaultTo('true');
                table.primary(['id', 'feed_id'], 'composite_primary_key');
                table.foreign(['route_id', 'feed_id']).references(['id', 'feed_id']).inTable('routes').onDelete('CASCADE');
                table.foreign(['service_id', 'feed_id']).references(['id', 'feed_id']).inTable('services').onDelete('CASCADE');
                table.foreign(['shape_id', 'feed_id']).references(['id', 'feed_id']).inTable('shapes').onDelete('CASCADE');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('trips');
    });
}
exports.down = down;
//# sourceMappingURL=20210310171452_trips.js.map