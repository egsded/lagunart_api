'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden() { return ['password'] }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  artworks() {
    return this.hasMany('App/Models/Artwork')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  user_notifications() {
    return this.belongsToMany('App/Models/Notification').pivotTable('notification_receivers').withPivot(['is_viewed'])
  }

  events() {
    return this.hasMany('App/Models/Event')
  }

  user_events() {
    return this.belongsToMany('App/Models/Event').pivotTable('user_events')
  }

  followers() {
    return this.belongsToMany('App/Models/User', 'user_id', 'follower').pivotTable('followers')
  }

  following() {
    return this.belongsToMany('App/Models/User', 'follower').pivotTable('followers')
  }

  sendmsg() {
    return this.hasMany('App/Models/Message', 'id', 'sender_id')
  }

  recivmsg() {
    return this.hasMany('App/Models/Message', 'id', 'receiver_id')
  }

  congratulations() {
    return this.belongsToMany('App/Models/Artwork').pivotTable('congratulations')
  }

  favorites() {
    return this.belongsToMany('App/Models/Artwork').pivotTable('user_favorites')
  }

  comments() {
    return this.hasMany('App/Models/Comment', 'id', 'user_id')
  }
}

module.exports = User
