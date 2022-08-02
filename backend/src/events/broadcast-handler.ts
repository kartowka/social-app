import { Server, Socket } from 'socket.io'

const broadcastPostMessageHandler = (io: Server, payload: string) => {
  io.to('all').emit('post:new', payload)
}
// const broadcastPostMessageHandler = (io: Server, socket: Socket) => {
//   const broadcastPostMessage = (msg: string) => {
//     /**
//      * ? io.emit(eventName, msg) to all connected clients
//      * @param eventName: string
//      * @param msg: string
//      * @returns Server
//      * ? socket.to("room1").emit() to all clients in room1 except the sender
//      * ? io.in("room1").emit() to all clients in room1
//      * ? io.to(socketId).emit() to individual socket.id (private message)
//      * * since all the clients join room 'all' then we will emit to all by using this command
//      */
//     io.to('all').emit('post:new', msg)
//     // io.to('all').emit('hello world')
//   }
//   socket.on('post:new', broadcastPostMessage)
// }

export default broadcastPostMessageHandler
