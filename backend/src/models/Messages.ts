import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
	senderID: {
		type: mongoose.Schema.Types.ObjectId,
	},
	body: {
		type: String,
	},
	username: {
		type: String,
	},
	time: {
		type: String,
	},
})

export default mongoose.model('Message', MessageSchema)
