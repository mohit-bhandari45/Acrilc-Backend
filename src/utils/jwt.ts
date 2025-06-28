import jwt from "jsonwebtoken";
import { ENV } from "./utils.js";

interface IUser {
    _id: any;
    fullName: string;
    email: string;
    role: "user" | "admin";
    googleId: string;
}

function encode(user: IUser) {
    const payload = {
        id: user._id,
        googleId: user.googleId,
        email: user.email,
        role: user.role,
    };

    const token: string = jwt.sign(payload, ENV.jwt_secret, { expiresIn: "7d" });
    return token;
}

function decode(token: string) {
    try {
        const user = jwt.verify(token, ENV.jwt_secret) as jwt.JwtPayload;
        return user;
    } catch (e: any) {
        console.error(e.message, { token });
        return false;
    }
}

export { encode, decode };
