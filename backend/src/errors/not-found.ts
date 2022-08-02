import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class NotFoundError extends CustomAPIError {
  StatusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.StatusCode = StatusCodes.NOT_FOUND
  }
}
export default NotFoundError
