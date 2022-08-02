import express from 'express'

import authenticationMiddleware from '../middleware/authentication'
const router = express.Router()
import { getPostsByEmail, getPosts, createPost, deletePost, updatePostByID } from '../controllers/postController'

router.route('/').post(authenticationMiddleware, createPost)
router.route('/').get(authenticationMiddleware, getPosts)
router.route('/:email').get(authenticationMiddleware, getPostsByEmail)
router.route('/:id').patch(authenticationMiddleware, updatePostByID)
router.route('/:id').delete(authenticationMiddleware, deletePost)

export default router
