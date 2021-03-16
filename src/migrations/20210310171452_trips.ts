import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('trips'))
        return await knex.schema.createTable('trips', (table) => {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feeds').onDelete('CASCADE').index();
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

            table.primary(['id', 'feed_id'], 'trips_primary_key');
            table.foreign(['route_id', 'feed_id']).references(['id', 'feed_id']).inTable('routes').onDelete('CASCADE');
            table.foreign(['service_id', 'feed_id']).references(['id', 'feed_id']).inTable('services').onDelete('CASCADE');
            table.foreign(['shape_id', 'feed_id']).references(['id', 'feed_id']).inTable('shapes').onDelete('CASCADE');

        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('trips')
}