import { Schema } from "mongoose";
import { IComment, IMedia } from "./post.js";

interface IStoryBoard {
    title: string;
    description: string;
    applauds?: Schema.Types.ObjectId[];
    comments?: IComment[];
    media: IMedia[];
    createdAt?: Date;
    updatedAt?: Date;
}

export { IStoryBoard };
