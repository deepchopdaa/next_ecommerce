import mongoose from "mongoose";

let isConnected = false; // connection state

export async function connectDB() {
    if (isConnected) return;

    if (!process.env.MONGODB_URI) {
        throw new Error(" MONGODB_URI not found in .env file");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
    }
}
