import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('transfers'))
        return await knex.schema.createTable('transfers', (table) => {
            table.string('from_stop_id').notNullable();
            table.string('trip_id').notNullable()
            table.string('to_stop_id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
            table.integer('transfer_type'); //enum 0-3 https://gtfs.org/reference/static/#transferstxt
            table.integer('min_transfer_time');
            
            table.primary(['trip_id', 'feed_id', 'from_stop_id'], 'transfers_primary_key');
            table.foreign(['trip_id', 'feed_id']).references(['id', 'feed_id']).inTable('trips').onDelete('CASCADE');
            table.foreign(['from_stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
            table.foreign(['to_stop_id', 'feed_id']).references(['id', 'feed_id']).inTable('stops').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('transfers')
}