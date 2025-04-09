import { model, Schema } from "mongoose";
import IMessage from "../types/message.js";

const messageSchema: Schema<IMessage> = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        recipientId: {
            type: Schema.Types.ObjectId,
            required: true,
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

const Message = model("message", messageSchema);
export default Message;
