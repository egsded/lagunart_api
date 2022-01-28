'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArtCategory extends Model {
	static get createdAtColumn() { return null }
	static get updatedAtColumn() { return null }
	subcategory(){
		return this.hasMany('App/Models/ArtSubcategory', 'id', 'art_categories_id')
	}
}

module.exports = ArtCategory
