import { Schema } from "mongoose";

interface ICollection {
    userId: Schema.Types.ObjectId;
    title: string;
    visibility: "public" | "private" | "unlisted";
    posts: Schema.Types.ObjectId[];
}

export { ICollection };
