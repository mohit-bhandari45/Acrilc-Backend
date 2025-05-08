import { Router } from "express";
import { getUserProfileHandler } from "../../controllers/user.js";
import { getPortfolioHandler } from "../../controllers/portfolio.js";

const router = Router();

/* Getting Profile */
router.get("/portfolio", getPortfolioHandler);
router.get("/:username", getUserProfileHandler);

export default router;
