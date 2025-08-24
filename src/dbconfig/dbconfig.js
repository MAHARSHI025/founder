// /dbconfig/dbconfig.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error("Please define DATABASE_URL in your environment");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    })
    .then((mongoose) => {
      console.log("✅ DB CONNECTED SUCCESSFULLY");
      return mongoose;
    })
    .catch((err) => {
      console.error("❌ DB CONNECTION FAILED", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
