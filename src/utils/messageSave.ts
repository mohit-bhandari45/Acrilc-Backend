import Message from "../models/message.js";
import { IMessage } from "../types/message.js";

async function saveOfflineMessage({ senderId, recipientId, content }: Partial<IMessage>) {
    try {
        const msg = new Message({
            senderId,
            recipientId,
            content,
            status: "sent",
        });

        await msg.save();
    } catch (err) {
        console.error("Error saving offline message:", err);
    }
}

export { saveOfflineMessage };
