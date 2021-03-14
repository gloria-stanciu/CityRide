import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('routes'))
        return await knex.schema.createTable('routes', (table) => {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
            table.string('agency_id');
            table.string('short_name');
            table.string('long_name');
            table.string('desc');
            table.integer('type'); //enum 0-12 https://gtfs.org/reference/static/#routestxt
            table.string('url');
            table.string('color');
            table.string('text_color');

            table.primary(['id', 'agency_id', 'feed_id'], 'routes_primary_key');
            table.unique(['id', 'feed_id'], 'routes_unique_id');
            table.foreign(['agency_id', 'feed_id']).references(['id', 'feed_id']).inTable('agency').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('routes')
}