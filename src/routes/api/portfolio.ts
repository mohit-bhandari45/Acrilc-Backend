import { Router } from "express";
import { addPortfolioURLHandler, checkURLHandler, deleteUrlHandler, getPortfolioHandler } from "../../controllers/portfolioControllers.js";

const router = Router();

router.post("/add", addPortfolioURLHandler);
router.get("/check", checkURLHandler);
router.delete("/delete", deleteUrlHandler);

export default router;
