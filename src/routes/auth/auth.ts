import { Router } from "express";
import { signUpHandler } from "../../controllers/auth.js"; // Ensure the path is correct

const router = Router();

router.post("/signup", signUpHandler);

export default router;
