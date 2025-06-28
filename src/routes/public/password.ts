import { Router } from "express";
import { forgotPasswordHandler, resetPasswordHandler } from "../../controllers/password.js";

const router = Router();

router.post("/forgot", forgotPasswordHandler);
router.post("/reset-password/:token", resetPasswordHandler);

export default router;
