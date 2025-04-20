type CacheEntry = {
    value: string;
    expiresAt: number;
};

class InMemoryCache {
    private static cache: Map<string, CacheEntry> = new Map();

    static get<T = any>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return JSON.parse(entry.value);
    }

    static set(key: string, value: string, ttlSeconds: number) {
        const expiresAt = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, { value: JSON.stringify(value), expiresAt });
    }
}

const USER_CACHE_PREFIX = "user:";
class CacheService {
    static getCachedUser = async <T = any>(userId: string): Promise<T | null> => {
        return InMemoryCache.get(USER_CACHE_PREFIX + userId);
    };

    static setCachedUser = async (userId: string, user: any): Promise<void> => {
        InMemoryCache.set(USER_CACHE_PREFIX + userId, user, 3600);
    };
}

export default CacheService;
