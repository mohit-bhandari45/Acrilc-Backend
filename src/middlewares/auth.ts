import { NextFunction, Request, Response } from "express";
import { decode } from "../utils/jwt.js";
import { IUser } from "../types/express.js";

async function authCheckMiddleware(req: Request, res: Response, next: NextFunction) : Promise<any>{
    const authHeader: string = req.headers.authorization!;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Unauthorized Access - No Token Provided"
        });
    }

    const token: string = authHeader.split("Bearer ")[1];

    try {
        const user = decode(token);

        if (!user) {
            return res.status(401).json({
                msg: "Unauthorized Access - Invalid Token"
            });
        }

        req.user = user as IUser;
        return next();
    } catch (error) {
        console.error("Token decoding error:", error);
        return res.status(401).json({
            msg: "Unauthorized Access - Token Verification Failed",
            error: error
        });
    }
}

export { authCheckMiddleware };