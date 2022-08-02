import express from 'express'
const router = express.Router()
import renewAuthenticationMiddleware from '../middleware/renew-authentication'

import { uploadFile, uploadMiddleware } from '../controllers/fileController'

router.route('/upload').post(uploadMiddleware, uploadFile)
export default router
