import { Request, Response } from 'express'
import multer from 'multer'
import { StatusCodes } from 'http-status-codes'
const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, './uploads')
	},
	filename(req, file, callback) {
		callback(null, `${Date.now()}-${file.originalname}`)
	},
})
const upload = multer({ storage: storage })

const uploadMiddleware = upload.single('file')

const uploadFile = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).send(`${process.env.BACKEND_ADDRESS}${req.file.path}`)
}
const updateFile = (req: Request, res: Response) => {}

export { uploadFile, updateFile, uploadMiddleware }
