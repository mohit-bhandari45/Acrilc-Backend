import { model, Schema } from "mongoose";
import { IComment, IMedia, IPost, IReply } from "../types/post.js";

const replySchema: Schema<IReply> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        text: {
            type: String,
            required: true,
        },
        applauds: [{ type: Schema.Types.ObjectId, ref: "user" }],
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
        score: {
            type: Number,
            deafult: 0,
        },
    },
    { timestamps: true }
);

postSchema.index(
    {
        title: "text",
        subtitle: "text",
        story: "text",
    },
    {
        weights: {
            title: 5,
            subtitle: 3,
            story: 1,
        },
        name: "TextSearchIndex",
    }
);

postSchema.post("findOneAndUpdate", async function (doc) {
    if (!doc) return;

    const applauds = doc.applauds.length;
    const comments = doc.comments.length;
    const replies = doc.comments.reduce((acc: any, comment: any) => acc + (comment.replies.length || 0), 0);
    const isRecent = (Date.now() - doc.createdAt.getTime()) / 36e4 < 24;

    doc.score = applauds * 3 + comments * 2 + replies + (isRecent ? 5 : 0);

    doc.save();
});

const Post = model<IPost>("post", postSchema);
export default Post;
