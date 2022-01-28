'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtCategoriesSchema extends Schema {
  up () {
    this.create('art_categories', (table) => {
      table.increments()
      table.string('category', 100).notNullable()
    })
  }

  down () {
    this.drop('art_categories')
  }
}

module.exports = ArtCategoriesSchema
