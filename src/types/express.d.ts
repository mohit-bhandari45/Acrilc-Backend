import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IUser extends JwtPayload {
    email: string;
    role: string
}

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser
    }
}