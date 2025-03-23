import { Schema } from "mongoose";

/* User Interface */
interface IUser extends Document {
    fullName: string;
    username: string;
    email: string;
    newEmail: string | null;
    newEmailToken: string | null;
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
}

/* Post Interfaces */
interface IMedia {
    url: string;
    type: "image" | "video" | "audio" | "gif";
    thumbnail?: string;
    duration?: number;
}

interface IComment {
    user: Schema.Types.ObjectId;
    text: string;
    applauds?: Schema.Types.ObjectId[];
    replies?: IComment[];

    createdAt?: Date;
    updatedAt?: Date;
}

interface IOption {
    text: string;
    votes: Schema.Types.ObjectId[];
}

interface IPoll {
    question: string;
    options: IOption[];
}

interface IPost {
    title: string;
    text: string;
    media: IMedia[];
    size: string;
    links: string[];
    hashTags: string[];
    mentions: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    likes: Schema.Types.ObjectId[];
    comments: IComment[];
    shares: Schema.Types.ObjectId[];
    saves: Schema.Types.ObjectId[];
    poll: IPoll;
    location: Location;
}

interface ICollection {
    userId: Schema.Types.ObjectId;
    title: string;
    visibility: "public" | "private" | "unlisted"
    posts: Schema.Types.ObjectId[]
}

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
}

export { IPost, IUser, IResponse, ICollection };