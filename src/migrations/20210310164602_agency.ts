import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('agency'))
        return await knex.schema.createTable('agency', (table) => 
        {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feed').onDelete('CASCADE').index();
            table.string('name').notNullable();
            table.string('url').notNullable();
            table.string('timezone').notNullable();
            table.string('lang');
            table.string('phone');
            table.string('fare_url');
            table.string('email');

            table.primary(['id', 'feed_id'], 'agency_primary_key');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('agency')
}