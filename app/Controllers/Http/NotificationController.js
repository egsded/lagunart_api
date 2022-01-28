'use strict'

const User = use('App/Models/User');
const Notification = use('App/Models/Notification');
const Database = use('Database');
class NotificationController {
	async index({params}){
		const usuario = await User.find(params.id)
		return await usuario.user_notifications().orderBy('created_at', 'desc').fetch()
	}

	async update({request, response}){
		const usuario = await User.find(request.input('id'))
		await Database.table('notification_receivers')
		.where('user_id',request.input('id'))
		.where('notification_id', request.input('notificacion'))
		.update({is_viewed:1})
	}
}

module.exports = NotificationController
