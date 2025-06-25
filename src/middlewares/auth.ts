import { NextFunction, Request, Response } from "express";
import CacheService from "../services/cache.js";
import UserService, { IUser } from "../services/userService.js";
import { decode } from "../utils/jwt.js";

async function authCheckMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    // Try to get token from Authorization header
    let token: string | undefined;

    const authHeader: string | undefined = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split("Bearer ")[1];
    }

    // If not in header, try cookie
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    // If no token found
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized Access - No Token Provided",
        });
    }

    try {
        const decoded = decode(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Unauthorized Access - Invalid Token",
            });
        }

        let cachedUser = await CacheService.getCachedUser<IUser>(decoded.id);

        if (!cachedUser) {
            cachedUser = await UserService.getUserById(decoded.id);

            if (!cachedUser) {
                return res.status(401).json({ message: "User not found. Token may be stale or invalid." });
            }

            await CacheService.setCachedUser(decoded.id, cachedUser);
        }

        req.user = cachedUser as IUser;
        return next();
    } catch (error) {
        console.error("Token decoding error:", error);
        return res.status(401).json({
            msg: "Unauthorized Access - Token Verification Failed",
            error: error,
        });
    }
}

export { authCheckMiddleware };
