import { Schema } from "mongoose";

interface IConversation {
    participants: Schema.Types.ObjectId[];
    lastMessage: IMessage;
    messages: IMessage[];
}

type Status = "sent" | "delivered" | "read";

interface IMessage {
    senderId: Schema.Types.ObjectId;
    recipientId: Schema.Types.ObjectId;
    content: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
}

export { IConversation, IMessage };
