import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import Client, { io as socketClient, Socket } from 'socket.io-client'
import request from 'supertest'

import Post from '../models/Post'
import User from '../models/User'
import { serverInstance } from '../server'
import { createSocketServer, destroySocketServer } from '../socket-server'

let socketServer: Server
type socketUserModel = {
  _id: string
  email: string
  password: string
  accessToken: string
  clientSocket: Socket
}
type InstantMessage = {
  body: string
  receiver: string
  sender: string
}

const users: socketUserModel[] = [
  {
    _id: '',
    email: 'user1@socket.io',
    password: '123456',
    accessToken: '',
    clientSocket: null,
  },
  {
    _id: '',
    email: 'user2@socket.io',
    password: '123456',
    accessToken: '',
    clientSocket: null,
  },
]
beforeAll(async () => {
  socketServer = createSocketServer()
})
afterAll(async () => {
  await Promise.all([
    User.deleteMany({ email: { $regex: '@socket.io' } }),
    Post.deleteMany({ sender: { $regex: '@socket.io' } }),
  ])
  destroySocketServer(socketServer)
  users[0].clientSocket.close()
  users[1].clientSocket.close()
  mongoose.connection.close()
})
describe('Auth API TEST', () => {
  const registerUser = async (user: socketUserModel) => {
    await request(serverInstance)
      .post('/api/auth/register')
      .send({ email: user.email, password: user.password })
      .expect(StatusCodes.CREATED)
  }
  const loginUser = async (user: socketUserModel) => {
    const response = await request(serverInstance)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(StatusCodes.OK)
    user.accessToken = response.body.token
    user._id = response.body.user._id
  }
  it('register users to DB', async () => {
    await Promise.all([registerUser(users[0]), registerUser(users[1])])
  })
  it('should login users', async () => {
    await Promise.all([loginUser(users[0]), loginUser(users[1])])
  })
})
describe('Socket.IO TEST', () => {
  const createClientSocket = (user: socketUserModel) => {
    return new Promise<void>(resolve => {
      user.clientSocket = Client(`http://localhost:${process.env.PORT}`, {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10,
        forceNew: true,
        auth: {
          token: `bearer ${user.accessToken}`,
        },
      })
      user.clientSocket.on('connect', () => {
        resolve()
      })
    })
  }
  const disconnectClientSocket = (user: socketUserModel) => {
    return new Promise<void>(resolve => {
      if (user.clientSocket.connected) {
        user.clientSocket.disconnect()
        resolve()
      }
    })
  }
  beforeEach(async () => {
    await Promise.all([createClientSocket(users[0]), createClientSocket(users[1])])
  })
  afterEach(async () => {
    await Promise.all([disconnectClientSocket(users[0]), disconnectClientSocket(users[1])])
  })
  it('should test echo event', done => {
    users[0].clientSocket.emit('common:echo', 'echo message')
    users[0].clientSocket.on('common:echo', (arg: string) => {
      expect(arg).toBe('echo message')
      done()
    })
    users[0].clientSocket.emit('common:echo', 'echo message')
  })
  it('should test ims', done => {
    const msg = { body: 'this is a test message', receiver: users[1]._id }
    users[0].clientSocket.emit('ims:sendMessage', msg)
    users[1].clientSocket.on('ims:receiveMessage', (rcMsg: InstantMessage) => {
      expect(rcMsg.body).toBe(msg.body)
      expect(rcMsg.sender).toBe(users[0]._id)
      expect(rcMsg.receiver).toBe(users[1]._id)
      done()
    })
  })

  const createPostMessageFromAPI = async (user: socketUserModel, msg: string) => {
    await request(serverInstance)
      .post('/api/post')
      .set({ Authorization: 'Bearer ' + user.accessToken })
      .send({ message: msg, sender: user.email })
  }

  // //TODO on user post message broadcast to room all and get the message
  it('should test broadcasting message', done => {
    expect.assertions(2)
    const msg = { body: 'broadcast message' }
    Promise.resolve(createPostMessageFromAPI(users[0], msg.body))
    users[1].clientSocket.on('post:new', (receivedMessage: string) => {
      expect(receivedMessage).toBe(msg.body)
      done()
    })
    users[0].clientSocket.on('post:new', (receivedMessage: string) => {
      expect(receivedMessage).toBe(msg.body)
    })
  })
})
