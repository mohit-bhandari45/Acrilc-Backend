import { Worker } from "bullmq";
import { connection } from "../lib/redis.js";
import { EmailService } from "../services/email.service.js";
import { IUser } from "../types/user.js";
import dotenv from "dotenv";
dotenv.config();

interface EmailJob {
    type: "email" | "reset";
    user: IUser;
    resetToken: string;
}

const emailWorker = new Worker(
    "emailQueue",
    async (job) => {
        const { type, user, resetToken } = job.data as EmailJob;
        console.log(type, user);

        if (type === "email") {
            await EmailService.sendWelcomeEmail(user);
        } else {
            await EmailService.sendResetPasswordEmail(user, resetToken);
        }
    },
    { connection }
);

emailWorker.on("completed", (job) => {
    console.log(`✅ Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
    console.error(`❌ Email job ${job?.id} failed:`, err);
});
