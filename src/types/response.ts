import { Schema } from "mongoose";
import { ICollection } from "./collection.js";
import { IComment, IPost } from "./post.js";
import { IUser } from "./user.js";

/* Response Interface */
interface IResponse {
    msg: string;
    token?: string | null;
    err?: string;
    post?: IPost;
    users?: IUser[];
    posts?: IPost[];
    preferences?: string;
    user?: Partial<IUser>;
    profilePic?: string;
    link?: string;
    username?: string;
    collections?: ICollection[];
    collection?: ICollection;
    comments?: IComment[];
    comment?: IComment;
    followers?: Schema.Types.ObjectId[];
    following?: Schema.Types.ObjectId[];
    cursor?: string;
}

export { IResponse };
