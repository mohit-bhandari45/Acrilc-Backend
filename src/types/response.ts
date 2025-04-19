import { Schema } from "mongoose";
import { ICollection } from "./collection.js";
import { IComment, IPost } from "./post.js";
import { IUser } from "./user.js";
import { IStoryBoard } from "./storyboard.js";

interface IAll extends IUser {
    posts: number;
}

type ResponseData = string | IPost | IPost[] | IUser | IUser[] | ICollection | ICollection[] | IComment | IComment[] | Schema.Types.ObjectId[] | Partial<IUser> | IAll | IStoryBoard | IStoryBoard[] | null;

/* Response Interface */
interface IResponse {
    msg: string;
    data?: ResponseData;
    token?: string | null;
    err?: string;
}

export { IResponse, IAll };
