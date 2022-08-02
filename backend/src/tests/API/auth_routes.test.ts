import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import request from 'supertest'

import { serverInstance as server, serverStart } from '../../server'

//* params
const email = 'antonfley@gmail.com'
const wrongEmail = 'qantonfley@gmail.com'
const password = 'qwerty123'
const wrongPassword = 'qwerty1231'
let ID = ''
let refreshToken = ''
//* end params
beforeAll(() => {
  serverStart()
})
afterAll(async () => {
  mongoose.connection.close()
  server.close()
})
describe('AUTH API TEST', () => {
  test('function register !email', async () => {
    const res = await request(server).post('/api/auth/register').send({ password: password })
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function register !password', async () => {
    const res = await request(server).post('/api/auth/register').send({ email: email })
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function register VALID', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ email: email, password: password })
    expect(res.statusCode).toEqual(StatusCodes.CREATED)
  })
  test('function register duplicate email', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ email: email, password: password })
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function login !email', async () => {
    const res = await request(server).post('/api/auth/login').send({ password: password })
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function login !password', async () => {
    const res = await request(server).post('/api/auth/login').send({ email: email })
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function login !user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: wrongEmail, password: wrongPassword })
    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  })
  test('function login !isPasswordCorrect', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: email, password: wrongPassword })
    expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  })
  test('function login VALID', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: email, password: password })
    ID = res.body.user._id
    refreshToken = res.body.user.refreshToken
    expect(res.statusCode).toEqual(StatusCodes.OK)
  })
  it('function renewToken', done => {
    request(server)
      .post('/api/auth/token')
      .set({ Authorization: 'Bearer ' + refreshToken })
      .expect(StatusCodes.OK, done)
  })
  it('function renewToken !valid', done => {
    request(server)
      .post('/api/auth/token')
      .set({ Authorization: 'Bearer ' + refreshToken + '1' })
      .expect(StatusCodes.FORBIDDEN, done)
  })
  it('function logout', done => {
    request(server)
      .delete('/api/auth/logout')
      .set({ Authorization: 'Bearer ' + refreshToken })
      .expect(StatusCodes.OK, done)
  })
  test('function deleteByID', async () => {
    const res = await request(server).delete('/api/auth/user/' + ID)
    expect(res.statusCode).toEqual(StatusCodes.OK)
  })
  test('function deleteByID !user', async () => {
    const res = await request(server).delete('/api/auth/user/' + ID)
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})
