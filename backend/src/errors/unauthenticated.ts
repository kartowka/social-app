import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class UnAuthenticatedError extends CustomAPIError {
  StatusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.StatusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnAuthenticatedError
