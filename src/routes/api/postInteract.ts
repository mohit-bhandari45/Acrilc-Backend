import { Router } from "express";
import {
    allCommentsHandler,
    allApplaudsHandler,
    commentPostHandler,
    getSpecificPostHandler,
    likePostHandler,
    addReplyHandler,
    addLikeHandler,
    deleteCommentHandler,
    updateCommentHandler,
    updateReplyHandler,
    deleteReplyHandler,
} from "../../controllers/post.js";

const router = Router();

router.get("/:postId", getSpecificPostHandler);

/* Likes Routes */
router.get("/likes/:postId", allApplaudsHandler);
router.get("/like/:postId", likePostHandler);

/* Comment Routes */
router.get("/comments/:postId", allCommentsHandler);
router.post("/comment/:postId", commentPostHandler);
router.patch("/comment/:commentId", updateCommentHandler);
router.delete("/comment/:commentId", deleteCommentHandler);

/* Comment Interact Routes */
router.post("/comment/reply/:commentId", addReplyHandler);
router.patch("/comment/reply/:replyId", updateReplyHandler);
router.delete("/comment/reply/:replyId", deleteReplyHandler);
router.post("/comment/like/:commentId", addLikeHandler);

export default router;
