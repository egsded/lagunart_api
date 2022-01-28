'use strict'
const Tag = use('App/Models/Tag');
const Db = use('Database')
const Drive = use('Drive')
class TagController {
	async index({ params }) {
		const variable = "%" + params.params + "%"
		const tags = await Tag.query().whereRaw('name like ?', variable).fetch()
		return tags
	}

	async getAllTagsOfArtwork({request}) {
		try {
			const artwork_id = request.input('artwork_id')
			const tagsOfArtwork = await Db.select('tags.name').from('artworks')
			  .join('artworks_has_tags', 'artworks_has_tags.artwork_id', 'artworks.id')
			  .join('tags', 'tags.id', 'artworks_has_tags.tag_id')
			  .where('artworks_has_tags.artwork_id', artwork_id)

			  var array = []
			  tagsOfArtwork.forEach(element => {
				array.push(element.name)
			  });
	  
			if (tagsOfArtwork.length !== 0) {
				console.log(array);
			  	const artworksOfTags = await Db.select('artworks.*').from('artworks')
					.join('artworks_has_tags', 'artworks_has_tags.artwork_id', 'artworks.id')
					.join('tags', 'tags.id', 'artworks_has_tags.tag_id')
					.whereIn('tags.name', array)
					.orderBy('artworks.views', 'desc')
					.limit(20)

				for (let index = 0; index < artworksOfTags.length; index++) {
					  const art = artworksOfTags[index];
					  let imgPath = art.path_img
					  let file = await Drive.get(imgPath)
					  let base64 = Buffer.from(file).toString('base64')
				
					  artworksOfTags[index].path_img = base64
				}
	  
			  return { tagsOfArtwork, artworksOfTags }
			}
				return { tagsOfArtwork }
			} catch (error) {
				console.log(error);
		}
	}
}
module.exports = TagController
