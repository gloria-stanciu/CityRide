import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('stops')))
    return await knex.schema.createTable('stops', (table) => {
      table.string('id').notNullable()
      table
        .string('feed_id')
        .notNullable()
        .references('id')
        .inTable('feeds')
        .onDelete('CASCADE')
        .index()
      table.string('code')
      table.string('name')
      table.string('desc')
      table.string('lat').notNullable()
      table.string('long').notNullable()
      table.integer('zone_id') //enum 0-3 https://gtfs.org/reference/static/#stop_timestxt
      table.string('stop_url')
      table.integer('location_type') //enum 0 sau 4 https://gtfs.org/reference/static/#stop_timestxt
      table.string('parent_station')
      table.string('stop_timezone')
      table.integer('wheelchair_boarding') //enum 0-2

      table.primary(['id', 'feed_id'], 'stops_primary_key')
    })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('stops')
}
