import { Router } from "express";
import { addCollectionHandler, deleteCollectionHandler, getCollectionHandler, getCollectionPostsHandler, removeCollectionPostHandler, updateCollectionHandler } from "../../controllers/collection.js";

const router = Router();

router.get("/", getCollectionHandler);
router.post("/", addCollectionHandler);
router.put("/:collectionId", updateCollectionHandler);
router.delete("/:collectionId", deleteCollectionHandler);
router.get("/:collectionId", getCollectionPostsHandler);

/* Post Options */
router.get("/:collectionId/remove-post", removeCollectionPostHandler);

export default router;