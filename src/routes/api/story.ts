import { Router } from "express";
import { createStoryBoardHandler, getStoryBoardHandler } from "../../controllers/story.js";

const router = Router();

router.get("/user/:userId", getStoryBoardHandler);
router.post("/", createStoryBoardHandler);

export default router;
