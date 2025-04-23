import { Request, Response } from "express";
import { Express } from "express";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IResponse } from "../types/response.js";
import fs from "fs";
import Collection from "../models/collection.js";
import UploadService from "../services/service.js";
import FormData from "form-data";
import { normalizeToArray } from "../utils/post.js";
import upload from "../lib/multer.js";
import { MulterError } from "multer";

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
 * @desc Create post
 * @route POST /api/posts
 */

async function createPostHandler(req: Request, res: Response): Promise<any> {
    try {
        // Wrap multer in a promise so we can await it
        await new Promise<void>((resolve, reject) => {
            if (!fs.existsSync("./uploads")) {
                fs.mkdirSync("uploads");
            }
            upload.array("media", 10)(req, res, (err: any) => {
                if (err instanceof MulterError) {
                    return reject({ status: 400, error: err.message });
                } else if (err) {
                    return reject({ status: 500, error: err.message });
                }
                resolve();
            });
        });

        // Now multer has parsed the request, so you can safely access req.body and req.files
        const author = req.user?.id;
        const { title, subtitle, story, size, links, hashTags, mentions, location, forte, collectionId } = req.body;

        const normalizedMentions = normalizeToArray(mentions);
        const normalizedLinks = normalizeToArray(links);
        const normalizedHashTags = normalizeToArray(hashTags);

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        console.log(files);

        const media = files
            ? await Promise.all(
                  files.map(async (file) => {
                      const formData = new FormData();
                      formData.append("image", fs.createReadStream(file.path));

                      const response = await UploadService.upload(formData);
                      const imageUrl = response.data.data.url;

                      fs.unlinkSync(file.path);

                      return {
                          url: imageUrl,
                          type: mediaType(file.mimetype),
                      };
                  })
              )
            : [];

        const post = await Post.create({
            author,

            title,
            subtitle,
            size,
            story,
            media,
            forte,
            links: normalizedLinks,
            hashTags: normalizedHashTags,
            mentions: normalizedMentions,
            location,
        });

        if (collectionId) {
            await Collection.findByIdAndUpdate(collectionId, { $push: { posts: post.id } }, { new: true });
        }

        return res.status(200).json({ msg: "Post Created Successfully", data: post });
    } catch (err: any) {
        const status = err.status || 500;
        console.log(err);
        return res.status(status).json({ error: err });
    }
}

/***
 * @desc Update post
 * @route PATCH /api/posts/:postId
 */
async function updatePostHandler(req: Request, res: Response): Promise<any> {
    await new Promise<void>((resolve, reject) => {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("uploads");
        }
        upload.array("media", 10)(req, res, (err: any) => {
            if (err instanceof MulterError) {
                return reject({ status: 400, error: err.message });
            } else if (err) {
                return reject({ status: 500, error: err.message });
            }
            resolve();
        });
    });

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    const media = files
        ? await Promise.all(
              files.map(async (file) => {
                  const formData = new FormData();
                  formData.append("image", fs.createReadStream(file.path));

                  const response = await UploadService.upload(formData);
                  const imageUrl = response.data.data.url;

                  fs.unlinkSync(file.path);

                  return {
                      url: imageUrl,
                      type: mediaType(file.mimetype),
                  };
              })
          )
        : [];

    const { postId } = req.params; // Post ID from URL
    const updates = req.body; // Data to update

    try {
        let response: IResponse = {
            msg: "",
        };

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: { updates, media: media } }, // Only update specified fields
            { new: true, runValidators: true } // Return updated post & apply schema validation
        );

        console.log(updatedPost);

        if (!updatedPost) {
            response.msg = "Post Not Found!";
            return res.status(404).json(response);
        }

        response.msg = "Post updated successfully!";
        response.data = updatedPost;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Posts of a user
 * @route GET /api/posts/user/:userId
 */
async function getPostsHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        let response: IResponse = {
            msg: "",
        };

        const posts = await Post.find({
            author: userId,
        })
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        response.msg = posts.length === 0 ? "No Posts Found!" : "Got All posts";
        response.data = posts;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Single post
 * @route GET /api/posts/:postId
 */
async function getSpecificPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate([
            {
                path: "applauds",
                select: "_id username profilepic",
            },
            {
                path: "comments.user",
                select: "_id username profilepic",
            },
            {
                path: "comments.applauds",
                select: "_id username profilepic",
            },
            {
                path: "comments.replies.user",
                select: "_id username profilepic",
            },
            {
                path: "comments.replies.applauds",
                select: "_id username profilepic",
            },
        ]);

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Post Found";
        response.data = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete a post
 * @route DELETE /api/posts/:postId
 */
async function deletePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            response.msg = "Post Not Found";
            return res.status(404).json(response);
        }

        response.msg = "Post Deleted Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { createPostHandler, updatePostHandler, getPostsHandler, getSpecificPostHandler, deletePostHandler };
