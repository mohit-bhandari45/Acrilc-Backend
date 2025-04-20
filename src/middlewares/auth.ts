import { NextFunction, Request, Response } from "express";
import CacheService from "../services/cache.js";
import UserService, { IUser } from "../services/userService.js";
import { decode } from "../utils/jwt.js";

async function authCheckMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader: string = req.headers.authorization!;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Unauthorized Access - No Token Provided",
        });
    }

    const token: string = authHeader.split("Bearer ")[1];

    try {
        const decoded = decode(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Unauthorized Access - Invalid Token",
            });
        }

        let cachedUser = await CacheService.getCachedUser<IUser>(decoded.id);
        console.log("Redis User", cachedUser);

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
