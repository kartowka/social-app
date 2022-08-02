import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	body: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
})

export default mongoose.model('Post', postSchema)
