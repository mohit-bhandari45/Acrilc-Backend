import { Router } from "express";
import { discoverHandler, getAllFortePosts, getTrendingForteHandler } from "../../controllers/discover.js";

const router = Router();

router.get("/trending", getTrendingForteHandler);
router.get("/", discoverHandler);
router.get("/forte", getAllFortePosts);

export default router;
