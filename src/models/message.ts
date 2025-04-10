import { model, Schema } from "mongoose";
import { IConversation, IMessage } from "../types/message.js";

const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        recipientId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        content: {
            type: String,
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
    },
    { timestamps: true }
);

const conversationSchema: Schema<IConversation> = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
        ],
        lastMessage: {
            type: messageSchema,
            required: true,
        },
        messages: [messageSchema],
    },
    { timestamps: true }
);

const Conversation = model("conversation", conversationSchema);
export default Conversation;
