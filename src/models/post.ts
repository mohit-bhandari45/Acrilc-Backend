import { model, Schema } from "mongoose";
import { IPost } from "../utils/interfaces.js";

const postSchema: Schema<IPost> = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        media: [
            {
                url: { type: String, required: true },
                type: { type: String, enum: ["image", "audio", "video", "gif"], required: true },
                thumbnail: { type: String },
                duration: { type: Number }
            },
        ],
        links: [{ type: String }],
        hashTags: [{ type: String }],
        mentions: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now() },
                likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
            },
        ],
        shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
        saves: [{ type: Schema.Types.ObjectId, ref: "User" }],
        poll: {
            question: { type: String },
            options: [
                {
                    text: { type: String, required: true },
                    votes: [{ type: Schema.Types.ObjectId, ref: "User" }],
                },
            ],
        },
        location: { type: String },
    },
    { timestamps: true }
);

const Post = model<IPost>("post", postSchema);
export default Post;
