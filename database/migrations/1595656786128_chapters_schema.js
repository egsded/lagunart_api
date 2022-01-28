'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChaptersSchema extends Schema {
  up () {
    this.create('chapters', (table) => {
      table.increments()
      table.string('tittle', 100).notNullable()
      table.text('content','longtext')
      table.integer('order')
      table.integer('artwork_id').unsigned().references('id').inTable('artworks').notNullable()
    })
  }

  down () {
    this.drop('chapters')
  }
}

module.exports = ChaptersSchema
