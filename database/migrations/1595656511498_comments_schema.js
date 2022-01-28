'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('artwork_id').unsigned().references('id').inTable('artworks').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
