import { Router } from "express";
import {
    addBannerPicHandler,
    addProfilePicHandler,
    changeEmailHandler,
    changePasswordHandler,
    deleteProfilePicHandler,
    getOwnProfileHandler,
    getPersonalDetailsHandler,
    getUserProfileHandler,
    setPreferencesHandler,
    setUsernameHandler,
    updatePersonalDetailsHandler,
} from "../../controllers/user.js";

const router = Router();

/* Getting Profiles */
router.get("/me", getOwnProfileHandler);
router.get("/:username", getUserProfileHandler);

/* Signup Continuation */
router.post("/username", setUsernameHandler);
router.post("/preferences", setPreferencesHandler);
router.post("/profile-pic", addProfilePicHandler);

/* General Settings */
router.get("/", getPersonalDetailsHandler);
router.put("/", updatePersonalDetailsHandler);
router.post("/banner-pic", addBannerPicHandler);
router.delete("/profile-pic", deleteProfilePicHandler);

/* Account and Settings */
router.post("/change-email", changeEmailHandler);
router.post("/change-password", changePasswordHandler);

export default router;
