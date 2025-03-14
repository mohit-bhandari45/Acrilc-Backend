import { JwtPayload } from "jsonwebtoken";

export interface IUser extends JwtPayload {
    email: string;
    role: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}
