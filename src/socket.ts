import { Socket } from "socket.io";
import { CustomSocket } from "./types/socket.js";
import User from "./models/user.js";
import { saveOfflineMessage } from "./utils/messageSave.js";
import { Schema } from "mongoose";
import Message from "./models/message.js";

const userSocketIdMap = new Map();
// userSocketIdMap.set("67f0c8fe986bf7ec7494fe60",)
// userSocketIdMap.set("67f0c8fe986bf7ec7494fe62",)

function socketHandler(io: any) {
    return async function (socket: CustomSocket) {
        console.log("🔌 Socket connected:", socket.id);
        console.log("🌐 Total connected clients:", io.engine.clientsCount);
        socket.emit("welcome", "Hi Welcome to the chats");

        // update the usermaps and database that user is online
        try {
            const userId = socket.user?.id;
            if (!userId) return;

            userSocketIdMap.set(userId, socket.id);
            await User.findByIdAndUpdate(userId, { isOnline: true });

            /* Send pending messages to the socket connected */
            const pendingMessages = await Message.find({
                recipientId: userId,
                status: "sent",
            });

            pendingMessages.forEach(async (message) => {
                socket.emit("receive-message", {
                    message: message.content,
                    from: message.senderId,
                });

                await Message.findByIdAndUpdate(message._id, {
                    status: "delivered",
                });
            });

            socket.on("send-message", async ({ message, to }) => {
                const toSocketId = userSocketIdMap.get(to);

                if (toSocketId) {
                    socket.to(toSocketId).emit("receive-message", {
                        message: message,
                        from: userId,
                    });

                    await Message.create({
                        senderId: userId,
                        recipientId: to,
                        content: message,
                        status: "delivered",
                    });
                } else {
                    await saveOfflineMessage({ senderId: userId as unknown as Schema.Types.ObjectId, recipientId: to, content: message });
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
