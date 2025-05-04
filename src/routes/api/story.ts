import { Router } from "express";
import { createStoryBoardHandler, getStoryBoardHandler } from "../../controllers/story.js";

const router = Router();

router.post("/", createStoryBoardHandler);
router.get("/user/:userId", getStoryBoardHandler);
// router.get("/:storyboardId", getSpecificStoryboardHandler); /* Get Specific Storyboard */
// router.patch("/:storyboardId", updateStoryboardHandler); /* Update specific Storyboard */
// router.delete("/:storyboardId", deleteStoryboardHandler); /* Delete Specific Storyboard */

export default router;
