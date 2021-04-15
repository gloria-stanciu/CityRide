import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('shape_points', function (table) {
    table.increments('id').alter()
  })
}

export async function down(knex: Knex): Promise<void> {}
