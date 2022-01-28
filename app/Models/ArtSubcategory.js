'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArtSubcategory extends Model {
	static get createdAtColumn() { return null }
	static get updatedAtColumn() { return null }
	artworks(){
		return this.hasMany('App/Models/Artwork','id','art_subcategory_id')
	}
}

module.exports = ArtSubcategory
