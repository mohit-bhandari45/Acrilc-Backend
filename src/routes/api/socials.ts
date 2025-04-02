import { Router } from "express";
import { followUnfollowHandler, getAllFollowersHandler, getAllFollowingHandler } from "../../controllers/social.js";

const router = Router();

router.get("/:userId/follow", followUnfollowHandler);
router.get("/:userId/followers", getAllFollowersHandler);
router.get("/:userId/following", getAllFollowingHandler);

export default router;
