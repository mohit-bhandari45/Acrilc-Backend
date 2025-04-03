import { Router } from "express";
import { discoverHandler } from "../../controllers/discover.js";

const router = Router();

router.get("/", discoverHandler);

export default router;
