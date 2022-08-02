import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError, UnAuthenticatedError } from '../errors/index'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeaders = req.headers['authorization']
	const token = authHeaders && authHeaders.split(' ')[1]
	if (token == null) throw new UnAuthenticatedError('unauthorize')
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) throw new ForbiddenError('forbidden')
		req.body.user = user
		next()
	})
}

export default authenticationMiddleware
