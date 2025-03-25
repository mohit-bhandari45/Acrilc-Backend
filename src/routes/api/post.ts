import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";
import postInteractRoute from "./postInteract.js";

const router = Router();

/* Like Routes */
router.use("/post", postInteractRoute);

/* Post Routes */
router.post("/", upload.array("media", 10), createPostHandler);
router.get("/:userId", getPostsHandler); /* Get posts */
router.get("/post/:postId", getSpecificPostHandler);
// router.put("/:postId", updatePostHandler); /* Update specific post */
router.delete("/post/:postId", deletePostHandler); /* Delete Specific Post */

export default router;
