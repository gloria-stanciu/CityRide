import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('stop_times'))
        return await knex.schema.createTable('stop_times', (table) => {
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

            table.primary(['trip_id', 'feed_id', 'stop_id'], 'stop_times_primary_key');
            table.foreign(['trip_id', 'feed_id']).references(['id', 'feed_id']).inTable('trips').onDelete('CASCADE');
            table.foreign(['stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('stop_times')
}