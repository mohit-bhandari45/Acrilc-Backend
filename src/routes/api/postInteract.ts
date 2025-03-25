import { Router } from "express";
import { allCommentsHandler, allLikesHandler, commentPostHandler, likePostHandler } from "../../controllers/post.js";

const router = Router();

/* Likes Routes */
router.get("/likes/:postId", allLikesHandler);
router.post("/like/:postId", likePostHandler);

/* Comment Routes */
router.get("/comments/:postId", allCommentsHandler);
router.post("/comment/:postId", commentPostHandler);

export default router;
