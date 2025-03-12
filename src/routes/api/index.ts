import { Router } from "express";
import postsRoutes from "./post.js";
import { authCheckMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.use(authCheckMiddleware);
router.use("/posts", postsRoutes);

export default router;
