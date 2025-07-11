import mongoose from "mongoose";

export async function connect() {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL, {
            dbName: process.env.DB_NAME,
        });

        console.log("✅ DB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("❌ ERROR while DATABASE CONNECTION");
        console.error(error);
    }
}
