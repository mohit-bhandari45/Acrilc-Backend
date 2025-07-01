import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler, updatePostHandler } from "../../controllers/postControllers.js";

const router = Router();

/* Post Routes */
router.post("/", createPostHandler);
router.get("/user/:userId", getPostsHandler); /* Get posts */
router.get("/:postId", getSpecificPostHandler); /* Get Specific Post */
router.patch("/:postId", updatePostHandler); /* Update specific post */
router.delete("/:postId", deletePostHandler); /* Delete Specific Post */

export default router;
