import { Router } from "express";
import { allLikesHandler, commentPostHandler, createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler, likePostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";

const router = Router();

/* Post Routes */
router.post("/", upload.array("media", 10), createPostHandler);
router.get("/:userId", getPostsHandler); /* Get posts */
router.get("/post/:postId", getSpecificPostHandler);

// router.put("/:postId", updatePostHandler); /* Update specific post */
router.delete("/post/:postId", deletePostHandler); /* Delete Specific Post */

/* Like Routes */
router.get("/likes/:postId", allLikesHandler);
router.get("/like/:postId", likePostHandler);

/* Comment Routes */
router.post("/comments/:postId", commentPostHandler);

export default router;
