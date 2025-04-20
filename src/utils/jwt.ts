import jwt from "jsonwebtoken";
import { ENV } from "./util.js";

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

    const token: string = jwt.sign(payload, ENV.jwt_secret);
    return token;
}

function decode(token: string) {
    try {
        const user = jwt.verify(token, ENV.jwt_secret) as jwt.JwtPayload;
        return user;
    } catch (e) {
        console.error(e, { token });
        return false;
    }
}

export { encode, decode };
