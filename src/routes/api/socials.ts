import { Router } from "express";
import { followUnfollowHandler, getAllFollowersHandler, getAllFollowingHandler } from "../../controllers/social.js";
import socialInteractRoute from "./socialInteract.js";

const router = Router();

router.get("/:userId/follow", followUnfollowHandler);
router.get("/:userId/followers", getAllFollowersHandler);
router.get("/:userId/following", getAllFollowingHandler);

/* Applaud and other stuff */
router.use("/:section", socialInteractRoute);

export default router;
