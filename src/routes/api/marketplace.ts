import { Router } from "express";
import { createMarketplaceProjectHandler, getSingleMarketProjectHandler } from "../../controllers/marketplace.js";

const router = Router();

router.post("/create", createMarketplaceProjectHandler);
router.get("/project/:projectId", getSingleMarketProjectHandler);

export default router;
