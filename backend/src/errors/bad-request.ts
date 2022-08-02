import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
	StatusCode: StatusCodes
	errorMessage: string
	constructor(message: string) {
		super(message)
		this.errorMessage = message
		this.StatusCode = StatusCodes.BAD_REQUEST
	}
}

export default BadRequestError
