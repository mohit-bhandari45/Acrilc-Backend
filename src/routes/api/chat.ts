import { Router } from "express";
import { getConversationHandler } from "../../controllers/chatControllers.js";

const router = Router();

router.get("/", getConversationHandler);

export default router;
