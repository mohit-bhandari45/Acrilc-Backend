import { Router } from "express";
import { createMarketplaceProjectHandler, getAllMarketPlaceApiHandler, getSingleMarketProjectHandler } from "../../controllers/marketplace.js";

const router = Router();

router.post("/create", createMarketplaceProjectHandler);
router.get("/project/:projectId", getSingleMarketProjectHandler);
router.get("/", getAllMarketPlaceApiHandler);

export default router;
