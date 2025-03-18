import { Router } from "express";
import { allLikesHandler, commentPostHandler, createPostHandler, deletePostHandler, getOtherPostsHandler, getPostsHandler, likePostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";

const router = Router();

/* Post Routes */

router.get("/", getPostsHandler); /* Getting personal posts */
router.get("/:userId", getOtherPostsHandler); /* Get other's posts */
router.post("/", upload.array("media", 10), createPostHandler);
// router.get("/:postId", getSpecificPostHandler);

// router.put("/:postId", updatePostHandler); /* Update specific post */
router.delete("/:postId", deletePostHandler); /* Delete Specific Post */

/* Like Routes */
router.get("/likes/:postId", allLikesHandler);
router.get("/like/:postId", likePostHandler);

/* Comment Routes */
router.post("/comments/:postId", commentPostHandler);

export default router;
