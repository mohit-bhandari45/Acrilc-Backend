import { model, Schema } from "mongoose";
import { IStoryBoard } from "../types/storyboard.js";
import { IComment, IMedia, IReply } from "../types/post.js";

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

const storyboardSchema: Schema<IStoryBoard> = new Schema(
    {
        author: {
            type: String,
            required: true,
            ref: "user",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        media: [mediaSchema],
        applauds: [{ type: Schema.Types.ObjectId, ref: "user" }],
        comments: [commentSchema],
    },
    { timestamps: true }
);

const Story = model<IStoryBoard>("story", storyboardSchema);
export default Story;
