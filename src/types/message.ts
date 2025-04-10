import { Schema } from "mongoose";

interface IConversation {
    participants: Schema.Types.ObjectId[];
    lastMessage: IMessage;
    messages: IMessage[];
}

interface IMessage {
    senderId: Schema.Types.ObjectId;
    recipientId: Schema.Types.ObjectId;
    content: string;
    status: "sent" | "delivered" | "read";
    createdAt?: Date;
    updatedAt?: Date;
}

export { IConversation, IMessage };
