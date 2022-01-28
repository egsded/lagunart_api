'use strict'

const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Artwork = use('App/Models/Artwork');
const Db = use('Database')

class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onNotification(variable){
    let user = await User.find(variable.user)
    switch(variable.type){
      case 'publication': {
        let segu = await user.followers().fetch()
        let seguidores = segu.rows
        let notificacion = new Notification()
        notificacion.content = user.username + " publicó"
        notificacion.type = variable.type
        notificacion.user_id = variable.user
        notificacion.artwork_id = variable.artwork
        await notificacion.save()
        for (var i = 0; i < seguidores.length; i++) {
          try{
            user = await User.find(seguidores[i].id)
            await user.user_notifications().save(notificacion)
          }catch(error){
            console.log(error)
          }
        }
        let resultado = await Notification.query().select("notifications.id", "notifications.artwork_id",
          "notifications.content", "notifications.created_at", "users.id as usuario_creador",
          "notification_receivers.user_id as usuario_receptor", "art_subcategories.art_categories_id as category")
        .join('users', 'users.id', 'notifications.user_id')
        .join('notification_receivers', 'notification_receivers.notification_id', 'notifications.id')
        .join('artworks', 'artworks.id', 'notifications.artwork_id')
        .join('art_subcategories', 'art_subcategories.id', 'artworks.art_subcategory_id')
        .where('notifications.id', notificacion.id).fetch()
        this.socket.broadcastToAll('notificacion', resultado)
      }break
      case 'comment': {
        let artwork = await Artwork.find(variable.artwork)
        let dueno = await User.find(artwork.user_id)
        let notificacion = new Notification()
        notificacion.content = "noticias de tu publicación"
        notificacion.type = variable.type
        notificacion.user_id = user.id
        notificacion.artwork_id = variable.artwork
        await notificacion.save()
        try{
          await dueno.user_notifications().save(notificacion)
          let resultado = await Notification.query().select("notifications.id", "notifications.artwork_id",
          "notifications.content", "notifications.created_at", "users.id as usuario_creador",
          "notification_receivers.user_id as usuario_receptor", "art_subcategories.art_categories_id as category")
          .join('users', 'users.id', 'notifications.user_id')
          .join('notification_receivers', 'notification_receivers.notification_id', 'notifications.id')
          .join('artworks', 'artworks.id', 'notifications.artwork_id')
          .join('art_subcategories', 'art_subcategories.id', 'artworks.art_subcategory_id')
          .where('notifications.id', notificacion.id).fetch()
          this.socket.broadcastToAll('notificacion', resultado)
        }catch(error){
          console.log(error)
        }
      } break
    }
  	/*this.socket.broadcastToAll('notificacion', notificacion)*/
  }
}

module.exports = NotificationController
