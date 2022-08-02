import { Request, Response } from 'express'
import Post from '../models/Post'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index'

const getPosts = async (req: Request, res: Response) => {
	const posts = await Post.find()
	res.status(StatusCodes.OK).json(posts)
}
const getPostsByEmail = async (req: Request, res: Response) => {
	const { email } = req.params
	const posts = await Post.find({ email: email })
	res.status(StatusCodes.OK).json(posts)
}
const createPost = async (req: Request, res: Response) => {
	const post = new Post({
		email: req.body.userPost.email,
		body: req.body.userPost.body,
		name: req.body.userPost.name,
		imageURL: req.body.userPost.imageURL,
	})
	const newPost = await post.save()
	res.status(StatusCodes.OK).json(newPost)
}
const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params
	const postToDelete = await Post.findByIdAndDelete(id)
	if (postToDelete.deletedCount == 0) {
		throw new BadRequestError('user not exist')
	}
	res.status(StatusCodes.OK).json()
}

const updatePostByID = async (req: Request, res: Response) => {
	const { _id, body, imageURL } = req.body
	const userPostUpdate = await Post.findOne({ _id: _id })
	userPostUpdate.body = body
	userPostUpdate.imageURL = imageURL
	await userPostUpdate.save()
	res.status(StatusCodes.OK).json()
}

export { getPosts, getPostsByEmail, createPost, deletePost, updatePostByID }
