import { Schema } from "mongoose";
import { IAll } from "./response.js";

type Visibility = "public" | "private" | "followers";

/* User Interface */
interface IUser {
    toObject(): IAll;
    fullName: string;
    username: string;
    email: string;
    newEmail?: string | null;
    newEmailToken?: string | null;
    googleId: string;
    password: string;
    profilePicture: string;
    bannerPicture: string;
    story: string;
    bio: string;
    socialLinks: Map<string, string>;
    visibility: Visibility;
    following: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    portfolioURL: string;
    role: "user" | "admin";
    preferences: string;
    services: string;
    isOnline: boolean;
}

export { IUser };
