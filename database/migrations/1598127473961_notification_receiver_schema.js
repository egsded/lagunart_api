'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationReceiverSchema extends Schema {
  up () {
    this.create('notification_receivers', (table) => {
      table.integer('notification_id').unsigned().references('id').inTable('notifications').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.boolean('is_viewed').notNullable().defaultTo(0)
    })
  }

  down () {
    this.drop('notification_receivers')
  }
}

module.exports = NotificationReceiverSchema
