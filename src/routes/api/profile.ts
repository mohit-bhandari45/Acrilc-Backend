import { Router } from "express";
import { getProfileHandler, updateProfileHandler } from "../../controllers/profile.js";
import upload from "../../lib/multer.js";

const router = Router();

router.get("/", getProfileHandler);
router.put("/", upload.single("profilePic"), updateProfileHandler);

export default router;
