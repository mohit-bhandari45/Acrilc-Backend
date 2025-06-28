import { Router } from "express";
import { googleAuthHandler, loginHandler, logoutHandler, signUpHandler } from "../../controllers/auth.js"; // Ensure the path is correct

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.post("/google", googleAuthHandler);
router.get("/logout", logoutHandler);

export default router;
