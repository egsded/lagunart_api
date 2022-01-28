'use strict'

class SaveController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onStart(){
  	await setInterval((socket) =>{
  		this.socket.broadcastToAll('start','ahora')
  	}, 10000, this.socket)
  }
}

module.exports = SaveController
