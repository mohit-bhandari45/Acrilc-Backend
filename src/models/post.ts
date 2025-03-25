import { model, Schema } from "mongoose";
import { IComment, IMedia, IPost, IReply } from "../utils/interfaces.js";

const replySchema: Schema<IReply> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const commentSchema: Schema<IComment> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        text: { type: String, required: true },
        applauds: [{ type: Schema.Types.ObjectId, ref: "user" }],
        replies: [replySchema],
    },
    { timestamps: true }
);

const mediaSchema: Schema<IMedia> = new Schema({
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["image", "video", "audio", "gif"],
        required: true,
    },
});

const postSchema: Schema<IPost> = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
        },
        size: {
            type: String,
            required: true,
        },
        story: {
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
        media: [mediaSchema],
        forte: {
            type: String,
        },
        applauds: [{ type: Schema.Types.ObjectId, ref: "user" }],
        comments: [commentSchema],
        location: { type: String },
    },
    { timestamps: true }
);

const Post = model<IPost>("post", postSchema);
export default Post;
