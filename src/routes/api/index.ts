import { Router } from "express";
import { authCheckMiddleware } from "../../middlewares/auth.js";
import { verifyEmailHandler } from "../../controllers/user.js";

import postsRoutes from "./post.js";
import userRoutes from "./user.js";
import collectionRoutes from "./collection.js";
import socialRoutes from "./socials.js";
import discoverRoutes from "./discover.js";
import conversationRoutes from "./chat.js";
import storyRoutes from "./story.js";
import portfolioRoutes from "./portfolio.js";
import utilRoutes from "./utils.js";
import marketplaceRoutes from "./marketplace.js";

const router = Router();

router.get("/verify-email", verifyEmailHandler);

router.use(authCheckMiddleware);
router.use("/user", userRoutes);
router.use("/collections", collectionRoutes);
router.use("/discover", discoverRoutes);
router.use("/conversation", conversationRoutes);
router.use("/posts", postsRoutes);
router.use("/story", storyRoutes);
router.use("/socials", socialRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/utils", utilRoutes);
router.use("/projects", marketplaceRoutes);

export default router;
