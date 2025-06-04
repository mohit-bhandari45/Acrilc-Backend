import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import { IResponse } from "./auth.js";
import Post from "../models/post.js";
import { IStoryBoard } from "../types/storyboard.js";
import { MulterError } from "multer";
import upload from "../lib/multer.js";
import UploadService from "../services/service.js";
import { Express } from "express";
import fs from "fs";
import FormData from "form-data";
import { IMedia } from "../types/post.js";
import Story from "../models/storyboard.js";

function mediaType(type: string): string {
    if (type.startsWith("image")) {
        return "image";
    } else if (type.startsWith("video")) {
        return "video";
    } else if (type.startsWith("audio")) {
        return "audio";
    } else {
        return "gif";
    }
}

/***
 * @desc Create Storyboard
 * @route PATCH /api/story/:postId
 */
async function createStoryBoardHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;

    try {
        const { title, description, media } = req.body;

        const response: IResponse = {
            msg: "",
        };

        const storyBoard = await Story.create({
            author: userId,
            title,
            description,
            media,
        });

        response.msg = "StoryBoard created";
        response.data = storyBoard;
        return res.status(201).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

// /***
//  * @desc Update Storyboard
//  * @route PATCH /api/story/:storyboardId
//  */
// async function updateStoryboardHandler(req: Request, res: Response): Promise<any> {
//     await new Promise<void>((resolve, reject) => {
//         if (!fs.existsSync("./uploads")) {
//             fs.mkdirSync("uploads");
//         }
//         upload.array("media", 10)(req, res, (err: any) => {
//             if (err instanceof MulterError) {
//                 return reject({ status: 400, error: err.message });
//             } else if (err) {
//                 return reject({ status: 500, error: err.message });
//             }
//             resolve();
//         });
//     });

//     const files: Express.Multer.File[] = req.files as Express.Multer.File[];

//     const media = files
//         ? await Promise.all(
//             files.map(async (file) => {
//                 const formData = new FormData();
//                 formData.append("image", fs.createReadStream(file.path));

//                 const response = await UploadService.upload(formData);
//                 const imageUrl = response.data.data.url;

//                 fs.unlinkSync(file.path);

//                 return {
//                     url: imageUrl,
//                     type: mediaType(file.mimetype),
//                 };
//             })
//         )
//         : [];

//     const { storyboardId } = req.params; // Post ID from URL
//     const updates = req.body; // Data to update

//     try {
//         let response: IResponse = {
//             msg: "",
//         };

//         const post = await Post.findOne({ "storyBoard._id": storyboardId });

//         if (!post || !post.storyBoard) {
//             response.msg = "Storyboard Not Found!";
//             return res.status(404).json(response);
//         }

//         if (updates.title) post.storyBoard.title = updates.title;
//         if (updates.description) post.storyBoard.description = updates.description;
//         if (media.length) post.storyBoard.media = media as IMedia[];
//         await post.save();

//         console.log(post.storyBoard);

//         response.msg = "Storyboard updated successfully!";
//         response.data = post.storyBoard;
//         return res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
//     }
// }

// /***
//  * @desc Get Storyboard
//  * @route PATCH /api/user/:userId
//  */
async function getStoryBoardHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        const response: IResponse = {
            msg: "",
        };

        const storyBoards = await Story.find({ author: userId });

        response.msg = "StoryBoards found";
        response.data = storyBoards as unknown as IStoryBoard[];
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

// /***
//  * @desc Get Single Storyboard
//  * @route GET /api/story/:storyboardId
//  */
// async function getSpecificStoryboardHandler(req: Request, res: Response): Promise<any> {
//     const { storyboardId } = req.params;

//     try {
//         let response: IResponse = {
//             msg: "",
//         };

//         const post = await Post.findOne({
//             "storyBoard._id": storyboardId,
//         }).populate([
//             {
//                 path: "storyBoard.applauds",
//                 select: "_id username profilepic",
//             },
//             {
//                 path: "storyBoard.comments.user",
//                 select: "_id username profilepic",
//             },
//             {
//                 path: "storyBoard.comments.applauds",
//                 select: "_id username profilepic",
//             },
//             {
//                 path: "storyBoard.comments.replies.user",
//                 select: "_id username profilepic",
//             },
//             {
//                 path: "storyBoard.comments.replies.applauds",
//                 select: "_id username profilepic",
//             },
//         ]);

//         if (!post) {
//             response.msg = "Storyboard Not found";
//             return res.status(404).json(response);
//         }

//         response.msg = "Storyboard Found";
//         response.data = post.storyBoard;
//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
//     }
// }

// /***
//  * @desc Delete a storyboard
//  * @route DELETE /api/story/:storyboardId
//  */
// async function deleteStoryboardHandler(req: Request, res: Response): Promise<any> {
//     const { storyboardId } = req.params;

//     try {
//         let response: IResponse = {
//             msg: "",
//         };

//         const post = await Post.findOne({
//             "storyBoard._id": storyboardId,
//         });

//         if (!post) {
//             response.msg = "Post Not Found";
//             return res.status(404).json(response);
//         }

//         post.storyBoard = undefined;
//         await post.save();

//         response.msg = "Storyboard Deleted Successfully";
//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
//     }
// }

// export { getStoryBoardHandler, createStoryBoardHandler, getSpecificStoryboardHandler, deleteStoryboardHandler, updateStoryboardHandler };
export { createStoryBoardHandler, getStoryBoardHandler };
