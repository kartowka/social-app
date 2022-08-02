import { io } from '../run_server'

const unicastPostMessage = (eventName: string, msg: string, receiver: string) => {
  io.to(receiver).emit(eventName, msg)
}

export default unicastPostMessage
