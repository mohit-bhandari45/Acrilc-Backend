import { model, Schema } from "mongoose";
import { IPost } from "../utils/interfaces.js";

const postSchema: Schema<IPost> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        media: [
            {
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "audio", "video", "gif"], required: true },
                thumbnail: { type: String },
                duration: { type: Number },
            },
        ],
        size: {
            type: String,
            required: true,
        },
        links: [{ type: String }],
        hashTags: [{ type: String }],
        mentions: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        comments: [
            {
                user: { type: Schema.Types.ObjectId, ref: "user", required: true },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now() },
                likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
            },
        ],
        shares: [{ type: Schema.Types.ObjectId, ref: "user" }],
        saves: [{ type: Schema.Types.ObjectId, ref: "user" }],
        location: { type: String },
    },
    { timestamps: true }
);

const Post = model<IPost>("post", postSchema);
export default Post;
