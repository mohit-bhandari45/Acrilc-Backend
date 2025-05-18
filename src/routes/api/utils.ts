import { Router } from "express";
import { getKeywordsHandler } from "../../controllers/utils.js";

const router = Router();

router.post("/get-keywords", getKeywordsHandler);

export default router;
