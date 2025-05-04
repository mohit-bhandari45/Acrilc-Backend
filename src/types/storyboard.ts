import { Schema } from "mongoose";
import { IComment, IMedia } from "./post.js";

interface IStoryBoard {
    author: Schema.Types.ObjectId;
    title: string;
    description: string;
    media: IMedia[];
    applauds: Schema.Types.ObjectId[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

export { IStoryBoard };
