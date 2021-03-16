import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('calendars'))
        return await knex.schema.createTable('calendars', (table) => {
            table.string('id').notNullable();
            table.string('feed_id').notNullable().references('id').inTable('feeds').onDelete('CASCADE').index();
            table.string('service_id');
            table.string('desc');
            table.boolean('monday').notNullable();
            table.boolean('tuesday').notNullable();
            table.boolean('wednesday').notNullable();
            table.boolean('thursday').notNullable();
            table.boolean('friday').notNullable();
            table.boolean('saturday').notNullable();
            table.boolean('sunday').notNullable();
            table.dateTime('start_date').notNullable();
            table.dateTime('end_date').notNullable();

            table.primary(['id', 'feed_id'], 'calendars_primary_key');
            table.foreign(['service_id', 'feed_id']).references(['id', 'feed_id']).inTable('services').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('calendars')
}