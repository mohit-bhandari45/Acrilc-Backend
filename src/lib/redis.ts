import dotenv from "dotenv";
import { Redis } from "ioredis";
dotenv.config();

const redisUrl = process.env.REDIS_URL;
export const connection = new Redis(redisUrl as string, {
    maxRetriesPerRequest: null,
});

connection.on("connect", () => {
    console.log("✅ Redis connected successfully");
});

connection.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});
