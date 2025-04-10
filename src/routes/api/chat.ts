import { Router } from "express";
import { getConversationHandler } from "../../controllers/chat.js";

const router = Router();

router.get("/", getConversationHandler);

export default router;
