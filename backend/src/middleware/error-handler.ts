import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (
  err: {
    StatusCode: number
    message: string
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: { [s: string]: any } | ArrayLike<unknown>
    code: number
    // eslint-disable-next-line @typescript-eslint/ban-types
    keyValues: {}
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong,try again later',
  }
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',')
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValues)} field has to be unique`
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
