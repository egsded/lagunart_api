'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.string('content', 200).notNullable()
      table.string('type', 45).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('artwork_id').unsigned().references('id').inTable('artworks').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
