import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { allLikesHandler, commentPostHandler, createPostHandler, deletePostHandler, getSpecificPostHandler, getSpecificPostsHandler, likePostHandler } from "../../controllers/post.js";

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

/* Post Routes */
router.post("/create", upload.array("media", 10), createPostHandler);
router.get("/author/:authorId", getSpecificPostsHandler);
router.get("/:postId", getSpecificPostHandler);
router.delete("/:postId", deletePostHandler);

/* Like Routes */
router.get("/likes/:postId", allLikesHandler);
router.get("/like/:postId", likePostHandler);

/* Comment Routes */
router.post("/comments/:postId", commentPostHandler);

export default router;
