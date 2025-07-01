import { Redis } from "ioredis";

export const connection = new Redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});

connection.on("connect", () => {
    console.log("✅ Redis connected successfully");
});

connection.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});
