import { Router } from "express";
import { addPortfolioURLHandler, checkURLHandler, deleteUrlHandler, getPortfolioHandler } from "../../controllers/portfolio.js";

const router = Router();

router.post("/add", addPortfolioURLHandler);
router.get("/check", checkURLHandler);
router.delete("/delete", deleteUrlHandler);

export default router;
