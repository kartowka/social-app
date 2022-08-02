import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import request from 'supertest'

import { serverInstance as server, serverStart } from '../../server'
beforeAll(() => {
  serverStart()
})

//* params
const postMessage = 'this is my test post'
const sender = 'Fleysher'
let senderID = ''
let token = ''
//* params

beforeAll(async () => {
  const res = await request(server)
    .post('/api/auth/login')
    .send({ email: 't@t.com', password: '123456' })
  token = res.body.token
})
afterAll(async () => {
  mongoose.connection.close()
  server.close()
})
describe('POST API TEST', () => {
  test('function createPost', async () => {
    const response = await request(server)
      .post('/api/post')
      .set({ Authorization: 'Bearer ' + token })
      .send({ message: postMessage, sender: sender })
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })
  test('function getPosts', async () => {
    const response = await request(server).get('/api/post')
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })
  test('function getPostsBySender', async () => {
    const response = await request(server).get('/api/post?sender=' + sender)
    senderID = response.body[0]._id
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body[0].message).toEqual(postMessage)
    expect(response.body[0].sender).toEqual(sender)
  })
  test('function getPostsById', async () => {
    const response = await request(server).get('/api/post/' + senderID)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.message).toEqual(postMessage)
    expect(response.body.sender).toEqual(sender)
    expect(response.body._id).toEqual(senderID)
  })
  test('function deletePostByID', async () => {
    const response = await request(server)
      .delete('/api/post/' + senderID)
      .set({ Authorization: 'Bearer ' + token })
    expect(response.statusCode).toEqual(StatusCodes.OK)
    const userExistAfterDelete = await request(server)
      .delete('/api/post/' + senderID)
      .set({ Authorization: 'Bearer ' + token })
    expect(userExistAfterDelete.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function getPostsById id doesnt exist', async () => {
    const response = await request(server).get('/api/post/' + senderID)
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})
