import { Router } from "express";
import { googleAuthHandler, loginHandler, signUpHandler } from "../../controllers/auth.js"; // Ensure the path is correct

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.post("/google", googleAuthHandler);

export default router;
