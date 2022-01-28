'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSubcategoriesSchema extends Schema {
  up () {
    this.create('art_subcategories', (table) => {
      table.increments()
      table.string('subcategory', 50).notNullable()
      table.integer('art_categories_id').unsigned().references('id').inTable('art_categories').notNullable()
    })
  }

  down () {
    this.drop('art_subcategories')
  }
}

module.exports = ArtSubcategoriesSchema
