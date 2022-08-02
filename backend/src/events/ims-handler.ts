import { Server, Socket } from 'socket.io'

// import logger from '../utils/logger'

type InstantMessage = {
	body: string
	receiver: string
	sender: string
}
const registerImsHandler = (io: Server, socket: Socket) => {
	const sendMessage = (instantMsg: InstantMessage) => {
		// logger.info(`instant message to: ${instantMsg.receiver}`)
		const receiver = instantMsg.receiver
		instantMsg.sender = socket.data.user
		io.to(receiver).emit('ims:receiveMessage', instantMsg)
	}
	// const receiveMessage = (instantMsg: InstantMessage) => {
	//   logger.info(`instant message from: ${instantMsg.sender}`)
	//   const receiver = instantMsg.sender
	//   instantMsg.sender = socket.id
	//   io.to(receiver).emit('ims:receiveMessage', instantMsg)
	// }
	socket.on('ims:sendMessage', sendMessage)
	// socket.on('ims:receiveMessage', receiveMessage)
}
export default registerImsHandler
