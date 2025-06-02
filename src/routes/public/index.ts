import { Router } from "express";
import { getUserProfileHandler } from "../../controllers/user.js";
import { getPortfolioHandler } from "../../controllers/portfolio.js";
import { getFeaturedArtistsHandler } from "../../controllers/public.js";
import { getPostsHandler } from "../../controllers/post.js";
import { getAllMarketPlaceHandler } from "../../controllers/marketplace.js";

const router = Router();

/* Get artists */
router.get("/", getFeaturedArtistsHandler);

/* Getting Profile */
router.get("/portfolio", getPortfolioHandler);
router.get("/:username", getUserProfileHandler);

/* Posts */
router.get("/user/:userId/featured-posts", getPostsHandler); // to be changed to get featured post only
router.get("/user/:userId/featured-market", getAllMarketPlaceHandler); // to be changed to get featured post only

export default router;
