'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserEventsSchema extends Schema {
  up () {
    this.create('user_events', (table) => {
    	table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    	table.integer('event_id').unsigned().references('id').inTable('events').notNullable()
    })
  }

  down () {
    this.drop('user_events')
  }
}

module.exports = UserEventsSchema
