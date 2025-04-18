import { Request, Response, Router } from "express"
import { PREFERENCE_ENUM } from "../../utils/enums.js";

const router = Router()

router.get("/fortes", (req: Request, res: Response): any => {
    return res.status(200).json(PREFERENCE_ENUM);
})

export default router;