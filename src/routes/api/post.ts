import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler } from "../../controllers/post.js";
import upload from "../../lib/multer.js";
import postInteractRoute from "./postInteract.js";

const router = Router();

/* Interact Routes */
router.use("/post", postInteractRoute);

/* Post Routes */
router.post("/", upload.array("media", 10), createPostHandler);  //(done)
router.get("/user/:userId", getPostsHandler); /* Get posts */  // (done)
router.get("/:postId", getSpecificPostHandler);  /* Get Specific Post */  //(done)
// router.put("/:postId", updatePostHandler); /* Update specific post */  
router.delete("/:postId", deletePostHandler); /* Delete Specific Post */  //(done)

export default router;
