'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('tittle',100).notNullable()
      table.text('info')
      table.string('cost',45)
      table.string('place',250)
      table.date('date').notNullable()
      table.time('time').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
