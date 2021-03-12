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
        if (!(yield knex.schema.hasTable('stops')))
            return yield knex.schema.createTable('stops', (table) => {
                table.string('id').notNullable();
                table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
                table.string('code');
                table.string('name');
                table.string('desc');
                table.string('lat').notNullable();
                table.string('long').notNullable();
                table.integer('zone_id'); //enum 0-3 https://gtfs.org/reference/static/#stop_timestxt
                table.string('stop_url');
                table.integer('location_type'); //enum 0 sau 4 https://gtfs.org/reference/static/#stop_timestxt
                table.string('parent_station');
                table.dateTime('stop_timezone');
                table.integer('wheelchair_boarding'); //enum 0-2
                table.primary(['id', 'feed_id'], 'composite_primary_key');
            });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.dropTable('stops');
    });
}
exports.down = down;
//# sourceMappingURL=20210310174951_stops.js.map