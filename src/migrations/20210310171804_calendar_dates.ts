import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  if (!(await knex.schema.hasTable('calendar_dates')))
    return await knex.schema.createTable('calendar_dates', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
      table
        .string('feed_id')
        .notNullable()
        .references('id')
        .inTable('feeds')
        .onDelete('CASCADE')
        .index()
      table.string('service_id')
      table.dateTime('date_time').notNullable()
      table.integer('exception_type').notNullable() //enum 1 sau 2 https://gtfs.org/reference/static/#calendar_datestxt

      table.primary(['id', 'feed_id'], 'calendar_dates_primary_key')
      table
        .foreign(['service_id', 'feed_id'])
        .references(['id', 'feed_id'])
        .inTable('services')
        .onDelete('CASCADE')
    })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('calendar_dates')
}
