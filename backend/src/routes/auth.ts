import express from 'express'

const router = express.Router()
import renewAuthenticationMiddleware from '../middleware/renew-authentication'
import { logout, renewToken, fetchUserFromFacebook, fetchUserFromGoogle, nativeRegisterOrLogin, updateUser } from '../controllers/userController'

router.route('/register').post(nativeRegisterOrLogin)
router.route('/facebook').post(fetchUserFromFacebook)
router.route('/google').post(fetchUserFromGoogle)
router.route('/login').post(nativeRegisterOrLogin)
router.route('/logout').delete(renewAuthenticationMiddleware, logout)
router.route('/token').post(renewAuthenticationMiddleware, renewToken)
router.route('/updateUser').patch(updateUser)
export default router
