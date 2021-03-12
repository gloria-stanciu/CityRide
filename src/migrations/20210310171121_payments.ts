import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('payments'))
        return await knex.schema.createTable('payments', (table) => {
            table.increments('id').notNullable().primary();
            table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').index();
            table.string('agency_id').notNullable();
            table.string('feed_id').notNullable();
            table.float('fare').notNullable();
            table.integer('currency_id').notNullable().references('id').inTable('currency').onDelete('CASCADE').index();
            table.dateTime('date_time');

            table.foreign(['agency_id', 'feed_id']).references(['id', 'feed_id']).inTable('agency').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('payments')
}