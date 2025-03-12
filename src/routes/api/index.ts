import { Router } from "express";
import postsRoutes from "./post.js";

const router = Router();

router.use("/posts", postsRoutes);

export default router;
