import { Router } from "express";
import { loginHandler, signUpHandler } from "../../controllers/auth.js"; // Ensure the path is correct

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

export default router;
