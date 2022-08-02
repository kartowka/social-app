import mongoose from 'mongoose'

const connectDB = async (url: string) => {
	try {
		await mongoose.connect(url)
		console.info(`🚀 connected to mongoDB 🚀`)
	} catch (e) {
		console.warn(e)
	}
}
export default connectDB
