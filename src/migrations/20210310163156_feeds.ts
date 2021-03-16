import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('feeds'))
        return await knex.schema.createTable('feeds', (table) => {
            table.string('id').notNullable().primary();
            table.string('publisher_name');
            table.string('publisher_url');
            table.string('lang');
            table.string('version');
            table.dateTime('start_date');
            table.dateTime('end_date');
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('feeds')
}