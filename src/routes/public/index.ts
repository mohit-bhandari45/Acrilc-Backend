import { Router } from "express";
import { getFeaturedArtistsHandler, getFeaturedArtsHandler, getFeaturedMarketsHandler } from "../../controllers/featured.js";
import { getAllMarketPlaceHandler } from "../../controllers/marketplace.js";
import { getPortfolioHandler } from "../../controllers/portfolio.js";
import { getPostsHandler } from "../../controllers/post.js";
import passwordRoutes from "./password.js";

const router = Router();

router.use("/password", passwordRoutes);

/* Featured MarketPlace at the home of any user */
router.get("/artists/featured", getFeaturedArtistsHandler);
router.get("/arts/featured", getFeaturedArtsHandler);
router.get("/featured/markets", getFeaturedMarketsHandler);

/* Getting Portfolio */
router.get("/portfolio/:identifier", getPortfolioHandler);

/* Posts */
router.get("/user/:userId/featured-posts", getPostsHandler); // to be changed to get featured post only
router.get("/user/:userId/featured-market", getAllMarketPlaceHandler); // to be changed to get featured marketplace only

export default router;
