import { Router } from "express";
import multer from "multer";
import { createPostHandler, getPostHandler, likePostHandler } from "../../controllers/post.js";
import fs from "fs";
import path from "path";

const router = Router();

const uploadDir: string = "./uploads";
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                console.log(err);
                return cb(err, null as unknown as string);
            }

            const fileCount: number = files.length + 1;
            const fileExtension: string = path.extname(file.originalname);
            const newFileName: string = `${fileCount}${fileExtension}`;

            return cb(err, newFileName);
        });
    },
});

const upload = multer({ storage });

router.get("/", getPostHandler);
router.post("/", upload.array("media", 10), createPostHandler);
router.get("/:postId/like", likePostHandler);

export default router;
