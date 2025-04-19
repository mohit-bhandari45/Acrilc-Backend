import { Router } from "express";
import { createStoryBoardHandler, getStoryBoardHandler } from "../../controllers/story.js";

const router = Router();

router.get("/", getStoryBoardHandler);
router.post("/", createStoryBoardHandler);

export default router;
