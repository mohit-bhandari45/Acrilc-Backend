import { Router } from "express";
import {
    addProfilePicHandler,
    changeEmailHandler,
    changePasswordHandler,
    deleteProfilePicHandler,
    getOwnProfileHandler,
    getPersonalDetailsHandler,
    getPreferencesHandler,
    getUserProfileHandler,
    setPreferencesHandler,
    setUsernameHandler,
    updatePersonalDetailsHandler,
    updatePreferenceHandler,
    verifyEmailHandler,
} from "../../controllers/user.js";
import upload from "../../lib/multer.js";

const router = Router();

/* Getting Profiles */
router.get("/me", getOwnProfileHandler);
router.get("/:userId", getUserProfileHandler);

/* Signup Continuation */
router.post("/username", setUsernameHandler);
router.post("/preferences", setPreferencesHandler);
router.post("/profile-pic", upload.single("profilePic"), addProfilePicHandler);

/* General Settings */
router.get("/", getPersonalDetailsHandler);
router.put("/", updatePersonalDetailsHandler);
router.put("/profile-pic", upload.single("profilePic"), addProfilePicHandler);
router.delete("/profile-pic", deleteProfilePicHandler);
router.get("/preferences", getPreferencesHandler);
router.put("/preferences", updatePreferenceHandler);

/* Account and Settings */
router.post("/change-email", changeEmailHandler);
router.post("/change-password", changePasswordHandler);

export default router;
