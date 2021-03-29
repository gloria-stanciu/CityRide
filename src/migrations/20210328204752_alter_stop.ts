import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('stops', function (table) {
    table.string('stop_timezone').alter()
  })
}

export async function down(knex: Knex): Promise<void> {}
