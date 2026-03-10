import mongoose from "mongoose";


/**
 * @description
 * Pool is a connection manager.
 * Instead of creating a new database connection for every request, it keeps multiple connections ready and reuses them.
 * This improves performance.
 */


// import { Pool } from "pg"

// export const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "MY-FIRST-PROJECT",
//   password: "Murali123",
//   port: 5432,
// })

// pool.connect()
//   .then(() => console.log("Database connected successfully"))
//   .catch(err => console.error("Database connection error:", err))


// export  const   mongo = await  mongoose.connect('mongodb+srv://mural_sieanergy_ai:tizLiuu82AQ1YbMM@muraliseanergyai.us3ki5x.mongodb.net/?appName=MuraliSeanergyAI').then((res)=>{
//   console.log("DB connected successfully")
// }).catch((err)=>{
//   console.log(err)
// })





let MONGO_URI = process.env.MONGODB_URI!
console.log(MONGO_URI,"kk")

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI,{bufferCommands:false}).then((mongoose) => {
      console.log("MongoDB connected")
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}