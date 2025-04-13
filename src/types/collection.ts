import { Schema } from "mongoose";

type Visibility = "public" | "private" | "unlisted";

interface ICollection {
    userId: Schema.Types.ObjectId;
    title: string;
    visibility: Visibility;
    posts: Schema.Types.ObjectId[];
}

export { ICollection };
