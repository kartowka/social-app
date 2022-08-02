import { Request, Response } from 'express'

import NotFoundError from '../errors/not-found'

const notFoundMiddleware = (req: Request, res: Response) => {
  throw new NotFoundError('page not found')
}
export default notFoundMiddleware
