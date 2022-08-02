// * application

import cors from 'cors'
import express from 'express'
const app = express()

import 'express-async-errors'

// * environment files
import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
// * middleware
import error_handler_middleware from './middleware/error-handler'
import not_found_middleware from './middleware/not-found'
// * routers
import authRouter from './routes/auth'
import fileRouter from './routes/file'

import postRouter from './routes/post'
// * app.use
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome!' })
})

app.use('/api/auth', authRouter)
app.use('/api/file', fileRouter)
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static('uploads'))

app.use('/api/post', postRouter)
app.use(not_found_middleware)
app.use(error_handler_middleware)

// * db

import connectDB from './db/connect'

// * server create

connectDB(process.env.MONGO_URL)

export default app
