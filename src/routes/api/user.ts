import { Router } from "express";
import {
    addProfilePicHandler,
    deleteProfilePicHandler,
    getOwnProfileHandler,
    getPersonalDetailsHandler,
    getPreferencesHandler,
    getUserProfileHandler,
    setPreferencesHandler,
    updatePreferenceHandler,
} from "../../controllers/user.js";
import upload from "../../lib/multer.js";

const router = Router();

/* Getting Profiles */
router.get("/me", getOwnProfileHandler);
router.get("/:userId", getUserProfileHandler);

/* General Settings */
router.get("/", getPersonalDetailsHandler);
// router.put("/", updateDetailsHandler);
router.post("/profile-pic", upload.single("profilePic"), addProfilePicHandler);
router.put("/profile-pic", upload.single("profilePic"), addProfilePicHandler);
router.delete("/profile-pic", deleteProfilePicHandler);

/* Preferences Routes */
router.get("/preferences", getPreferencesHandler);
router.post("/preferences", setPreferencesHandler);
router.put("/preferences", updatePreferenceHandler);

export default router;
