'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CongratulationsSchema extends Schema {
  up () {
    this.create('congratulations', (table) => {
    	table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    	table.integer('artwork_id').unsigned().references('id').inTable('artworks').notNullable()
    })
  }

  down () {
    this.drop('congratulations')
  }
}

module.exports = CongratulationsSchema
