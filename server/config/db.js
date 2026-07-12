import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri || /<[^>]+>/.test(mongoUri)) {
      throw new Error(
        'MONGO_URI is not configured. Replace the placeholder values in server/.env with your real MongoDB Atlas username, password, and cluster host.',
      )
    }

    const connection = await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
