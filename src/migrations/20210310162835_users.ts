import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable('users'))
        return await knex.schema.createTable('users', (table) => 
        {
            table.increments('id').notNullable().primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('phone_number').notNullable();
            table.string('password').notNullable();
            table.boolean('is_confirmed').defaultTo(false);
            table.boolean('is_admin').defaultTo(false);
        });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users')
}

