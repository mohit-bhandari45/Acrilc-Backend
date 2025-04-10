import { Schema } from "mongoose";
import Conversation from "./models/message.js";
import User from "./models/user.js";
import { CustomSocket } from "./types/socket.js";

const userSocketIdMap = new Map();
// userSocketIdMap.set("67f0c8fe986bf7ec7494fe60",)
// userSocketIdMap.set("67f0c8fe986bf7ec7494fe62",)

function socketHandler(io: any) {
    return async function (socket: CustomSocket) {
        console.log("🔌 Socket connected:", socket.id);
        console.log("🌐 Total connected clients:", io.engine.clientsCount);
        socket.emit("welcome", "Hi Welcome to the chats");

        // Update the usermaps and database that user is online and sending messages
        try {
            const userId = socket.user?.id;
            if (!userId) return;

            userSocketIdMap.set(userId, socket.id);
            await User.findByIdAndUpdate(userId, { isOnline: true });

            /* Send pending messages to the socket connected */
            const conversations = await Conversation.find({
                "messages.recipientId": userId,
                "messages.status": "sent",
            });

            conversations.forEach(async (convo) => {
                const pendingMessages = convo.messages.filter((message) => {
                    return message.recipientId.toString() === userId && message.status === "sent";
                });

                pendingMessages.forEach((pendmsg) => {
                    socket.emit("receive-message", {
                        message: pendmsg.content,
                        from: pendmsg.senderId,
                    });

                    pendmsg.status = "delivered";
                });

                await convo.save();
            });

            socket.on("typing-message", async ({ to }) => {
                const toSocketId = userSocketIdMap.get(to);
                if (toSocketId) {
                    socket.to(toSocketId).emit("user-typing", { from: socket.user?.id });
                }
            });

            socket.on("stop-typing", async ({ to }) => {
                const toSocketId = userSocketIdMap.get(to);
                if (toSocketId) {
                    socket.to(toSocketId).emit("user-stop-typing", { from: socket.user?.id });
                }
            });

            socket.on("read-messages", async ({ conversationId, fromUserId }) => {
                try {
                    const conversation = await Conversation.findById(conversationId);
                    if (!conversation) return;

                    let updated = false;

                    conversation.messages.forEach((msg) => {
                        if (msg.senderId.toString() === fromUserId && msg.recipientId.toString() === socket.user?.id && msg.status !== "read") {
                            msg.status = "read";
                            updated = true;
                        }
                    });

                    if (updated) {
                        await conversation.save();
                    }
                } catch (err) {
                    console.error("Error marking messages as read:", err);
                }
            });

            socket.on("send-message", async ({ message, to }) => {
                const toSocketId = userSocketIdMap.get(to);

                let conversation = await Conversation.findOne({
                    participants: { $all: [userId, to], $size: 2 },
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [userId, to],
                        lastMessage: {
                            senderId: userId,
                            recipientId: to,
                            content: message,
                            status: toSocketId ? "delivered" : "sent",
                        },
                        messages: [
                            {
                                senderId: userId,
                                recipientId: to,
                                content: message,
                                status: toSocketId ? "delivered" : "sent",
                            },
                        ],
                    });
                } else {
                    conversation.messages.push({
                        senderId: userId as unknown as Schema.Types.ObjectId,
                        recipientId: to,
                        content: message,
                        status: toSocketId ? "delivered" : "sent",
                    });

                    conversation.lastMessage = {
                        senderId: userId as unknown as Schema.Types.ObjectId,
                        recipientId: to,
                        content: message,
                        status: toSocketId ? "delivered" : "sent",
                    };
                    await conversation.save();
                }

                if (toSocketId) {
                    socket.to(toSocketId).emit("receive-message", {
                        message: message,
                        from: userId,
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }

        socket.on("disconnect", async () => {
            console.log("❌ User disconnected:", socket.id);

            const userId = socket.user?.id;

            if (userId) {
                userSocketIdMap.delete(userId);
                await User.findByIdAndUpdate(userId, { isOnline: false });
            }
        });
    };
}

export default socketHandler;
