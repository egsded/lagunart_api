'use strict'
const User = use('App/Models/User')
const Event = use('App/Models/Event')

class EventController {
    async index({ auth, response }) {
        
    }
    async store({ auth, request, response }) {
        const user = await auth.getUser()
        const event = new Event()
        const { tittle, info, cost, place, date, time} = request.all()
        event.tittle = tittle
        event.info = info
        event.cost = cost
        event.place = place
        event.date = date
        event.time = time
        event.user_id = user.id
        event.save()
        return response.json(event)
    }
    async update({ request }) {
        const event_id = request.input('event_id')
        const event = await Event.find(event_id)
        const { tittle, info, cost, place, date, time} = request.all()
        event.tittle = tittle
        event.info = info
        event.cost = cost
        event.place = place
        event.date = date
        event.time = time
        event.save()
        return event
    }
    async destroy({ params,response}) {
        const event = await Event.find(params.id)
        await event.delete()
        return response.json({ message: 'Se eliminó el evento' })
    }
}

module.exports = EventController
