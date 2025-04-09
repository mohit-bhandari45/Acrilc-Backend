import { Document, Schema } from "mongoose";

interface IMessage extends Document {
    senderId: Schema.Types.ObjectId;
    recipientId: Schema.Types.ObjectId;
    content: string;
    status: "sent" | "delivered" | "read";
    createdAt: Date;
    updatedAt: Date;
}

export default IMessage;
