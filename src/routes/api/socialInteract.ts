import { Router } from "express";
import {
    addApplaudPostCommentReplyHandler,
    addPostCommentApplaudHandler,
    addReplyHandler,
    allApplaudsHandler,
    allCommentsHandler,
    applaudSectionHandler,
    commentPostHandler,
    deleteCommentHandler,
    deleteReplyHandler,
    updateCommentHandler,
    updateReplyHandler,
} from "../../controllers/social.js";

const router = Router({ mergeParams: true });

/* Likes Routes */
router.get("/:sectionId/applauds", allApplaudsHandler); //(done)
router.get("/:postId/applaud", applaudSectionHandler); //(done)

/* Comment Routes */
router.get("/:sectionId/comments", allCommentsHandler); //(done)
router.post("/:sectionId/comment", commentPostHandler); //(done)
router.patch("/:sectionId/comment/:commentId", updateCommentHandler); //(done)
router.delete("/:sectionId/comment/:commentId", deleteCommentHandler); //(done)

/* Comment Interact Routes */
router.get("/:sectionId/comment/:commentId/applaud", addPostCommentApplaudHandler); //(done)
router.post("/:sectionId/comment/:commentId/reply", addReplyHandler); //(done)
router.patch("/:sectionId/comment/:commentId/reply/:replyId", updateReplyHandler); //(done)
router.delete("/:sectionId/comment/:commentId/reply/:replyId", deleteReplyHandler); //(done)
router.get("/:sectionId/comment/:commentId/reply/:replyId/applaud", addApplaudPostCommentReplyHandler); //(done)

export default router;
