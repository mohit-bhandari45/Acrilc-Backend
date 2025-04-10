import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import Conversation from "../models/message.js";

async function getConversationHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json(setErrorDetails("Unauthorized", "User ID not found"));
    }

    try {
        const conversations = await Conversation.find({
            participants: userId,
        })
            .populate({
                path: "participants",
                select: "_id name profilePicture",
                match: { _id: { $ne: userId } },
            })
            .sort({ updatedAt: -1 });

        const formatted = conversations.map((convo) => {
            const otherUser = convo.participants[0] as unknown as { _id: string; name: string; profilePicture: string };

            const unreadMessages = convo.messages.filter((msg) => {
                return msg.recipientId.toString() === userId.toString() && msg.status === "delivered";
            });

            const lastMessage = convo.lastMessage;

            return {
                conversationId: convo._id,
                recipient: {
                    _id: otherUser?._id,
                    name: otherUser?.name,
                    profilePicture: otherUser?.profilePicture,
                },
                message: lastMessage,
                messages: convo.messages,
                status: lastMessage.status,
                unreadCount: unreadMessages.length,
            };
        });

        return res.status(200).json(formatted);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getConversationHandler };
