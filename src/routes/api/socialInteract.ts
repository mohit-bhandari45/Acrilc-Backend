import { Router } from "express";
import { applaudSectionHandler } from "../../controllers/socialControllers.js";

const router = Router({ mergeParams: true });

// /* Likes Routes */
// router.get("/:sectionId/applauds", allApplaudsHandler);
router.get("/:id/applaud", applaudSectionHandler);

// /* Comment Routes */
// router.get("/:sectionId/comments", allCommentsHandler); //(done)
// router.post("/:sectionId/comment", commentPostHandler); //(done)
// router.patch("/:sectionId/comment/:commentId", updateCommentHandler); //(done)
// router.delete("/:sectionId/comment/:commentId", deleteCommentHandler); //(done)

// /* Comment Interact Routes */
// router.get("/:sectionId/comment/:commentId/applaud", addPostCommentApplaudHandler); //(done)
// router.post("/:sectionId/comment/:commentId/reply", addReplyHandler); //(done)
// router.patch("/:sectionId/comment/:commentId/reply/:replyId", updateReplyHandler);
// router.delete("/:sectionId/comment/:commentId/reply/:replyId", deleteReplyHandler);
// router.get("/:sectionId/comment/:commentId/reply/:replyId/applaud", addApplaudPostCommentReplyHandler);

export default router;
