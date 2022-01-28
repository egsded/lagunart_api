'use strict'

const Category = use('App/Models/ArtCategory');
const Subcategory = use('App/Models/ArtSubcategory');
class CategoryController {
	async categories() {
		const catego = await Category.query().fetch()
		return { catego }
	}
	async subcategories() {
		const subcat = await Subcategory.query().fetch()
		return { subcat }
	}
	async getSubcategories({params}) {
		if (params.id == 0 || params.id == 'undefined') {
			const subcat = await Subcategory.query().fetch()
			return subcat
		}
		const catego = await Category.findBy('id', params.id)
		const subcat = await catego.subcategory().fetch()
		return subcat
	}
}

module.exports = CategoryController
