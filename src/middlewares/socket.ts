import { Socket } from "socket.io";
import { decode } from "../utils/jwt.js";
import { CustomSocket, CustomUser } from "../types/socket.js";

async function socketAuthMiddleware(socket: CustomSocket, next: (err?: any) => void) {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication token missing"));
    const user = decode(token);
    if (!user) return next(new Error("Invalid Token"));
    socket.user = user as CustomUser;
    next();
}

export { socketAuthMiddleware };
