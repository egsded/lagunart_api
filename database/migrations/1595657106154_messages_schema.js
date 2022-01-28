'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.text('content','mediumtext').notNullable()
      table.integer('sender_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('receiver_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
