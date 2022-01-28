'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtworksSchema extends Schema {
  up () {
    this.create('artworks', (table) => {
      table.increments()
      table.string('title',100).notNullable()
      table.text('description')
      table.integer('art_subcategory_id').unsigned().references('id').inTable('art_subcategories').notNullable()
      table.boolean('is_adult_content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('views').defaultTo(0)
      table.boolean('is_private').defaultTo(1)
      table.string('path_img',45)
      table.string('extension',50)
      table.timestamps()
    })
  }

  down () {
    this.drop('artworks')
  }
}

module.exports = ArtworksSchema
