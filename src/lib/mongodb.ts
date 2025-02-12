import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''
const DB_NAME = process.env.DB_NAME || ''

if (!MONGODB_URI || !DB_NAME) {
  throw new Error('MONGODB_URI or DB_NAME is not defined in .env file')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
