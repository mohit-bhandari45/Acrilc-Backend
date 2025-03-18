import { Router } from "express";
import postsRoutes from "./post.js";
import profileRoutes from "./profile.js";
import settingsRouter from "./setting.js";
import userRoutes from "./user.js";
import { authCheckMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.use(authCheckMiddleware);
router.use("/user", userRoutes);
router.use("/posts", postsRoutes);
router.use("/profile", profileRoutes);
router.use("/settings", settingsRouter);

export default router;
