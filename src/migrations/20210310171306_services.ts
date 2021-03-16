import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('services'))
        return await knex.schema.createTable('services', (table) => {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feeds').onDelete('CASCADE').index();

            table.primary(['id', 'feed_id'], 'services_primary_key');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('services')
}