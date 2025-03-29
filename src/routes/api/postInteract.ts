import { Router } from "express";
import {
    addApplaudPostCommentReplyHandler,
    addPostCommentApplaudHandler,
    addReplyHandler,
    allApplaudsHandler,
    allCommentsHandler,
    applaudPostHandler,
    commentPostHandler,
    deleteCommentHandler,
    deleteReplyHandler,
    updateCommentHandler,
    updateReplyHandler
} from "../../controllers/post.js";

const router = Router();

/* Likes Routes */
router.get("/:postId/applauds", allApplaudsHandler);  //(done)
router.get("/:postId/applaud", applaudPostHandler);  //(done)

/* Comment Routes */
router.get("/:postId/comments", allCommentsHandler);  //(done)
router.post("/:postId/comment", commentPostHandler);  //(done)
router.patch("/:postId/comment/:commentId", updateCommentHandler); //(done)
router.delete("/:postId/comment/:commentId", deleteCommentHandler);  //(done)

/* Comment Interact Routes */
router.get("/:postId/comment/:commentId/applaud", addPostCommentApplaudHandler); //(done)
router.post("/:postId/comment/:commentId/reply", addReplyHandler); //(done)
router.patch("/:postId/comment/:commentId/reply/:replyId", updateReplyHandler); //(done)
router.delete("/:postId/comment/:commentId/reply/:replyId", deleteReplyHandler); //(done)
router.get("/:postId/comment/:commentId/reply/:replyId/applaud", addApplaudPostCommentReplyHandler); //(done)

export default router;
