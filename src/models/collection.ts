import { model, Schema } from "mongoose";
import { ICollection } from "../types/collection.js";

const collectionSchema: Schema<ICollection> = new Schema(
    {
        userId: {
            type: String,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        visibility: {
            type: String,
            enum: ["public", "private", "unlisted"],
            default: "public",
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "post",
            },
        ],
    },
    { timestamps: true }
);

const Collection = model<ICollection>("collection", collectionSchema);
export default Collection;
