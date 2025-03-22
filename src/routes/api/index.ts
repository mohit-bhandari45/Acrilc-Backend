import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth.js";
import postsRoutes from "./post.js";
import userRoutes from "./user.js";
import { verifyEmailHandler } from "../../controllers/user.js";

const router = Router();

router.get("/verify-email", verifyEmailHandler);

router.use(authCheckMiddleware);
router.use("/user", userRoutes);
router.use("/posts", postsRoutes);

export default router;
