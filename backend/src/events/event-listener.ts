import { Server, Socket } from 'socket.io'
import { getMessages, createMessage } from '../controllers/messageController'

const onEventHandler = async (io: Server, socket: Socket) => {
	socket.join('all')
	socket.on('send_message', async (data) => {
		const message = await createMessage(data)
		socket.broadcast.emit('receive_message', message)
	})

	socket.once('disconnect', () => {
		console.log('socket disconnected')

		socket.disconnect()
	})
}

export { onEventHandler }
