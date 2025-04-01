import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler, updatePostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";
import postInteractRoute from "./postInteract.js";

const router = Router();

/* Interact Routes */
router.use("/post", postInteractRoute);

/* Post Routes */
router.post("/", upload.array("media", 10), createPostHandler);
router.get("/user/:userId", getPostsHandler); /* Get posts */
router.get("/:postId", getSpecificPostHandler); /* Get Specific Post */
router.patch("/:postId", updatePostHandler); /* Update specific post */
router.delete("/:postId", deletePostHandler); /* Delete Specific Post */

export default router;