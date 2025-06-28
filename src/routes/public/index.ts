import { Router } from "express";
import { getUserProfileHandler } from "../../controllers/user.js";
import { getPortfolioHandler } from "../../controllers/portfolio.js";
import { getPostsHandler } from "../../controllers/post.js";
import { getAllMarketPlaceHandler } from "../../controllers/marketplace.js";
import { getFeaturedArtsHandler, getFeaturedMarketsHandler, getFeaturedArtistsHandler } from "../../controllers/featured.js";
import passwordRoutes from "./password.js";

const router = Router();

router.use("/password", passwordRoutes);

/* Get artists */
router.get("/", getFeaturedArtistsHandler);

/* Featured MarketPlace at the home of any user */
router.get("/featured/artists", getFeaturedArtistsHandler);
router.get("/featured/arts", getFeaturedArtsHandler);
router.get("/featured/markets", getFeaturedMarketsHandler);

/* Getting Profile */
router.get("/portfolio", getPortfolioHandler);
router.get("/:username", getUserProfileHandler);

/* Posts */
router.get("/user/:userId/featured-posts", getPostsHandler); // to be changed to get featured post only
router.get("/user/:userId/featured-market", getAllMarketPlaceHandler); // to be changed to get featured marketplace only

export default router;
