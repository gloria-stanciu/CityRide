import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('currency'))
        return await knex.schema.createTable('currency', (table) => {
            table.increments('id').notNullable().primary();
            table.string('name').notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('currency')
}