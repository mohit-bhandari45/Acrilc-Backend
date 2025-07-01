import { Queue } from "bullmq";
import { connection } from "../lib/redis.js";

const emailQueue = new Queue("emailQueue", { connection });
export default emailQueue;
