import { Server, Socket } from 'socket.io'

const registerEchoHandler = (io: Server, socket: Socket) => {
  const echoHandler = (payload: string) => {
    socket.emit('common:echo', payload)
  }

  socket.once('common:echo', echoHandler)
}

export default registerEchoHandler
