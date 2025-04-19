import { Schema } from "mongoose";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export interface IUser extends jwt.JwtPayload {
    id: Schema.Types.ObjectId,
    fullName: string,
    email: string,
    role: "user" | "admin",
}

class UserService {
    static async getUserById(id: string) {
        const user = await User.findById(id);

        if (!user) {
            return null;
        }

        const mainUser: IUser = {
            id: user._id as unknown as Schema.Types.ObjectId,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        };

        return mainUser;
    }
}

export default UserService;