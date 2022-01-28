'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserFavoritesSchema extends Schema {
  up () {
    this.create('user_favorites', (table) => {
    	table.integer('artwork_id').unsigned().references('id').inTable('artworks').notNullable()
    	table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down () {
    this.drop('user_favorites')
  }
}

module.exports = UserFavoritesSchema
