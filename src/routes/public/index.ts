import { Router } from "express";
import { getUserProfileHandler } from "../../controllers/user.js";
import { getPortfolioHandler } from "../../controllers/portfolio.js";
import { getFeaturedArtistsHandler } from "../../controllers/public.js";

const router = Router();

/* Get artists */
router.get("/", getFeaturedArtistsHandler);

/* Getting Profile */
router.get("/portfolio", getPortfolioHandler);
router.get("/:username", getUserProfileHandler);

export default router;
