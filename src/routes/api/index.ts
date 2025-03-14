import { Router } from "express";
import postsRoutes from "./post.js";
import profileRoutes from "./profile.js";
import { authCheckMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.use(authCheckMiddleware);
router.use("/posts", postsRoutes);
router.use("/profile", profileRoutes);

export default router;
