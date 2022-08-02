import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class ForbiddenError extends CustomAPIError {
  StatusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.StatusCode = StatusCodes.FORBIDDEN
  }
}

export default ForbiddenError
