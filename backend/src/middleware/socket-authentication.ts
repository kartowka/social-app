import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'

import { ForbiddenError, UnAuthenticatedError } from '../errors/index'

const socketAuthenticationMiddleware = (socket: Socket, next: NextFunction) => {
	const authHeaders = socket.handshake.auth.token
	const token = authHeaders && authHeaders.split(' ')[1]
	if (token == null) throw new UnAuthenticatedError('unauthorize')
	jwt.verify(token, process.env.JWT_SECRET, (err: unknown, user: { userId: string }) => {
		if (err) throw new ForbiddenError('forbidden')
		socket.data.user = user.userId
		next()
	})
}

export default socketAuthenticationMiddleware
