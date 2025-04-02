import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth.js";
import postsRoutes from "./post.js";
import userRoutes from "./user.js";
import collectionRoutes from "./collection.js";
import socialRoutes from "./socials.js";
import { verifyEmailHandler } from "../../controllers/user.js";

const router = Router();

router.get("/verify-email", verifyEmailHandler);

router.use(authCheckMiddleware);
router.use("/user", userRoutes);
router.use("/posts", postsRoutes);
router.use("/collections", collectionRoutes);
router.use("/socials", socialRoutes);

export default router;
