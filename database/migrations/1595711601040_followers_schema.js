'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowersSchema extends Schema {
  up () {
    this.create('followers', (table) => {
    	table.integer('follower').unsigned().references('id').inTable('users').notNullable()
    	table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    	table.boolean('is_followed').defaultTo(1)
    })
  }

  down () {
    this.drop('followers')
  }
}

module.exports = FollowersSchema
