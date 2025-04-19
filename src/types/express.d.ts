import { JwtPayload } from "jsonwebtoken";

export interface IUser extends JwtPayload {
    email: string | undefined;
    role: string | undefined;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}
