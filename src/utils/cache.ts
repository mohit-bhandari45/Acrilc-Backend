import redis from "../redis.js";

const USER_CACHE_PREFIX = "user:";

export const getCachedUser = async <T = any>(userId: string): Promise<T | null> => {
    const data = await redis.get(USER_CACHE_PREFIX + userId);
    return data ? JSON.parse(data) : null;
};

export const setCachedUser = async (userId: string, user: any): Promise<void> => {
    await redis.set(USER_CACHE_PREFIX + userId, JSON.stringify(user), {
        EX: 3600,
    });
};
