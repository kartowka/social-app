import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError, UnAuthenticatedError } from '../errors/index'

const renewAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers['authorization']
  const token = authHeaders && authHeaders.split(' ')[1]
  if (token == null) throw new UnAuthenticatedError('unauthorize')
  jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, user) => {
    if (err) throw new ForbiddenError('forbidden')
    req.body.user = user
    next()
  })
}

export default renewAuthenticationMiddleware
