import { Socket as BaseSocket } from "socket.io";

export interface CustomUser {
    id: string;
    email: string;
    role?: "user" | "admin";
    iat?: number;
    exp?: number;
}

interface CustomSocket extends BaseSocket {
    user?: CustomUser;
}
