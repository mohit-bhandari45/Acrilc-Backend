import { Router } from "express";
import { getPreferencesHandler, setPreferencesHandler, updatePreferenceHandler } from "../../controllers/user.js";

const router = Router();

/* Preferences Routes */
router.get("/preferences", getPreferencesHandler);
router.post("/preferences", setPreferencesHandler);
router.put("/preferences", updatePreferenceHandler);

export default router;
