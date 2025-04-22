import { Router } from "express";
import { createStoryBoardHandler, getStoryBoardHandler, getSpecificStoryboardHandler, deleteStoryboardHandler, updateStoryboardHandler } from "../../controllers/story.js";

const router = Router();

router.get("/user/:userId", getStoryBoardHandler);
router.post("/:postId", createStoryBoardHandler);
router.get("/:storyboardId", getSpecificStoryboardHandler); /* Get Specific Storyboard */
router.patch("/:storyboardId", updateStoryboardHandler); /* Update specific Storyboard */
router.delete("/:storyboardId", deleteStoryboardHandler); /* Delete Specific Storyboard */

export default router;
