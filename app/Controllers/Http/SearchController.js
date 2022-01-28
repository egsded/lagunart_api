'use strict'

const Artwork = use('App/Models/Artwork');
const Event = use('App/Models/Event');
const User = use('App/Models/User')
const ArtSubcategory = use('App/Models/ArtSubcategory');
const ArtCategory = use('App/Models/ArtCategory');
const Drive = use('Drive')
class SearchController {
	async home({params}){
		const palabra = params.params

		const busqueda = "%" + palabra + "%"

		const artworks = await Artwork.query().select('artworks.id', 'artworks.title', 'artworks.description',
			'artworks.is_adult_content', 'artworks.user_id', 'artworks.views', 'artworks.is_private',
			'artworks.path_img', 'artworks.extension', 'artworks.created_at', 'artworks.updated_at',
			'artworks.art_subcategory_id', 'art_subcategories.subcategory', 'art_categories.category')
		.join('art_subcategories','art_subcategories.id','artworks.art_subcategory_id')
		.join('art_categories', 'art_categories.id','art_subcategories.art_categories_id')
		.whereRaw('title like ?', busqueda).fetch()
		const usuarios = await User.query().whereRaw('name like ?', busqueda).orWhere('username', 'like', busqueda).fetch()
		const eventos = await Event.query().whereRaw('tittle like ?', busqueda).fetch()
		
		return {artworks,usuarios,eventos}
	}

	async user({params, id}){
		const palabra = params.params
		const user = params.id

		const busqueda = "%" + palabra + "%"

		const usuario = await User.findBy('id',user)
		const eventos = await usuario.events().whereRaw('tittle like ?', busqueda).fetch()
		const artworks = await usuario.artworks().whereRaw('title like ?', busqueda).fetch()

		const arts = artworks.rows

		var subcatego = {}
		var categoria = {}
		for (var i = 0; i < arts.length; i++) {
			subcatego = await ArtSubcategory.findBy('id', arts[i].art_subcategory_id)
			categoria = await ArtCategory.findBy('id', subcatego.art_categories_id)
			arts[i].subcategory = subcatego
			arts[i].category = categoria
		}

		try {
		for (let index = 0; index < arts.length; index++) {
			
			const art = arts[index];
			let imgPath = art.path_img
			let file = await Drive.get(imgPath)
			let base64 = Buffer.from(file).toString('base64')

			arts[index].path_img = base64
		}
		
		return {arts, eventos}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = SearchController
