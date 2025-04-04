import { Schema } from "mongoose";

/* Post Interfaces */
interface IMedia {
    url: string;
    type: "image" | "video" | "audio" | "gif";
    thumbnail?: string;
    duration?: number;
}

interface IReply {
    _id?: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    text: string;
    applauds?: Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface IComment {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    text: string;
    applauds?: Schema.Types.ObjectId[];
    replies?: IReply[];

    createdAt?: Date;
    updatedAt?: Date;
}

interface IPost {
    author: Schema.Types.ObjectId;
    title: string;
    subtitle: string;
    size: string;
    story: string;
    links: string[];
    hashTags: string[];
    mentions: Schema.Types.ObjectId[];
    media: IMedia[];
    forte: string;
    applauds: Schema.Types.ObjectId[];
    comments: IComment[];
    location: Location;
    createdAt: Date;
    updatedAt: Date;
}

export { IPost, IComment, IMedia, IReply };
