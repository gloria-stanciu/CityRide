import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('shapes'))
        return await knex.schema.createTable('shapes', (table) => {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();

            table.primary(['id', 'feed_id'],'shapes_primary_key');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('shapes')
}