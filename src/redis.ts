import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
        reconnectStrategy: false, // ⛔ no retries
    },
});

redis.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});

export const redisConnect = async () => {
    if (!redis.isOpen) {
        await redis.connect();
        console.log("✅ Connected to Redis");
    }
};

export default redis;
