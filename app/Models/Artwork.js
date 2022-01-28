'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Db = use('Database')

class Artwork extends Model {
  comments() {
    return this.hasMany('App/Models/Comment')
  }
  congratulations() {
    return this.belongsToMany('App/Models/User').pivotTable('congratulations')
  }
  chapters() {
    return this.hasMany('App/Models/Chapter')
  }
  tags() {
    return this.belongsToMany('App/Models/Tag').pivotTable('artworks_has_tags')
  }
  notifications(){
    return this.hasMany('App/Models/Notification')
  }

  // QUERY - Get artworks with commonly required data
  static queryArt() {
    return this.query().select(
      'artworks.*',
      'art_categories.id AS category_id',
      'art_categories.category AS category',
      'art_subcategories.id AS subcategory_id',
      'art_subcategories.subcategory AS subcategory',
      'users.id AS user_id',
      'users.username')
      .select(Db.raw(
        'COUNT(congratulations.artwork_id) AS congratulations, '+
        'COUNT(comments.id) AS comments'
      ))
      // categories info
      .join('art_subcategories', 'artworks.art_subcategory_id', 'art_subcategories.id')
      .join('art_categories', 'art_subcategories.art_categories_id', 'art_categories.id')
      // interaction numbers
      .leftJoin('congratulations', 'artworks.id', 'congratulations.artwork_id')
      .leftJoin('comments', 'artworks.id', 'comments.artwork_id')
      // artist info
      .join('users', 'users.id', 'artworks.user_id')
      .groupBy('artworks.id')
  }
}

module.exports = Artwork
