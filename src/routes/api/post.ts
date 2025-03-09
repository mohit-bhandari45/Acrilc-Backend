import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req: Request, res: Response) => {
    console.log(req);
    console.log(req.body);
    res.json({ msg: "hello" });
});

export default router;
