import { Router } from "express";
import { googleAuthHandler, loginHandler, logoutHandler, signUpHandler } from "../../controllers/authControllers.js"; // Ensure the path is correct
import { verifyEmailHandler } from "../../controllers/userControllers.js";

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.post("/google", googleAuthHandler);
router.get("/logout", logoutHandler);
router.get("/verify-email", verifyEmailHandler);

export default router;
