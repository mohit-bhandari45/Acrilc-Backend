import mongoose from "mongoose";

async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Optional: exit the process if DB fails to connect
    }
}

export { connectDB };
