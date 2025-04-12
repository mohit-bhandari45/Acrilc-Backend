import { Schema } from "mongoose";
import { IComment, IPost } from "./post.js";
import { ICollection } from "./collection.js";
import { IAll } from "./response.js";

/* User Interface */
interface IUser extends Document {
    toObject(): IAll;
    fullName: string;
    username: string;
    email: string;
    newEmail: string | null;
    newEmailToken: string | null;
    googleId: string;
    password: string;
    profilePicture: string;
    story: string;
    bio: string;
    socialLinks: Map<string, string>;
    visibility: "public" | "private" | "followers";
    following: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    role: "user" | "admin";
    preferences: string;
    services: string;
    isOnline: boolean;
}

export { IUser };
