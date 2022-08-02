import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { Server, Socket } from 'socket.io'

import { onEventHandler } from './events/event-listener'
import socketAuthenticationMiddleware from './middleware/socket-authentication'
import { serverInstance, serverStart } from './server'

const pubClient = createClient({ url: process.env.REDIS_URL })
const subClient = pubClient.duplicate()
let socketServer: Server
const createSocketServer = () => {
	socketServer = new Server(serverStart(), { cors: { origin: '*' } })
	redisClientConnect(socketServer)
	socketServer.on('connection', (socket: Socket) => {
		console.log('socket connected')
		onEventHandler(socketServer, socket)
	})
	return socketServer
}
const destroySocketServer = async (io: Server) => {
	await Promise.all([redisClientDisconnect(), io.close(), serverInstance.close()])
}
const redisClientDisconnect = async () => {
	await Promise.all([subClient.disconnect(), pubClient.disconnect()])
}
const redisClientConnect = async (io: Server) => {
	await Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
		io.adapter(createAdapter(pubClient, subClient))
	})
}

export { createSocketServer, destroySocketServer, redisClientConnect, redisClientDisconnect, socketServer }
