import { Request, Response } from "express";
import Collection from "../models/collection.js";
import Post from "../models/post.js";
import { IResponse } from "../types/response.js";
import { setErrorDetails } from "../utils/helper.js";
import { normalizeToArray } from "../utils/post.js";

/***
 * @desc Create post
 * @route POST /api/posts
 */

async function createPostHandler(req: Request, res: Response): Promise<any> {
    try {
        // Now multer has parsed the request, so you can safely access req.body and req.files
        const author = req.user?.id;
        const { title, subtitle, story, size, links, hashTags, mentions, location, forte, collectionId, media } = req.body;

        const normalizedMentions = normalizeToArray(mentions);
        const normalizedLinks = normalizeToArray(links);
        const normalizedHashTags = normalizeToArray(hashTags);

        const post = await Post.create({
            author,
            title,
            subtitle,
            size,
            story,
            media,
            thumbnail: media[0].url,
            forte,
            links: normalizedLinks,
            hashTags: normalizedHashTags,
            mentions: normalizedMentions,
            location,
        });

        if (collectionId) {
            await Collection.findByIdAndUpdate(collectionId, { $push: { posts: post.id } }, { new: true });
        }

        return res.status(201).json({ msg: "Post Created Successfully", data: post });
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
    const { postId } = req.params; // Post ID from URL
    const updates = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const updatedPost = await Post.findByIdAndUpdate(postId, { $set: { ...updates } }, { new: true, runValidators: true });

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
                path: "author",
                select: "_id username fullName profilePicture",
            },
            {
                path: "applauds",
                select: "_id username profilePicture",
            },
            {
                path: "comments.user",
                select: "_id username profilePicture",
            },
            {
                path: "comments.applauds",
                select: "_id username profilePicture",
            },
            {
                path: "comments.replies.user",
                select: "_id username profilePicture",
            },
            {
                path: "comments.replies.applauds",
                select: "_id username profilePicture",
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

export { createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler, updatePostHandler };
