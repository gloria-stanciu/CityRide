import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('shape_points'))
        return await knex.schema.createTable('shape_points', (table) => {
            table.string('id').notNullable().primary();
            table.string('shape_id');
            table.string('feed_id');
            table.string('lat').notNullable();
            table.string('long').notNullable();
            table.string('sequence').notNullable();
            table.string('shape_dist_traveled');

            table.foreign(['shape_id', 'feed_id']).references(['id', 'feed_id']).inTable('shapes').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('shape_points')
}