import { Router } from "express";
import { allLikesHandler, commentPostHandler, createPostHandler, deletePostHandler, getSpecificPostHandler, getSpecificPostsHandler, likePostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";

const router = Router();

/* Post Routes */
router.post("/create", upload.array("media", 10), createPostHandler);
router.get("/author", getSpecificPostsHandler);
router.get("/:postId", getSpecificPostHandler);
router.delete("/:postId", deletePostHandler);

/* Like Routes */
router.get("/likes/:postId", allLikesHandler);
router.get("/like/:postId", likePostHandler);

/* Comment Routes */
router.post("/comments/:postId", commentPostHandler);

export default router;
