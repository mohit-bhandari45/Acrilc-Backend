import { Router } from "express";
import { getOwnProfile, getProfile } from "../../controllers/profile.js";

const router = Router();

router.get("/me", getOwnProfile); /* Get personal profile */
router.get("/:userId", getProfile); /* Get Other's profile */

export default router;
