import { Request, Response } from "express";
import { Express } from "express";
import { Schema } from "mongoose";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IUser } from "../utils/interfaces.js";
import { IResponse } from "../utils/interfaces.js";
import Collection from "../models/collection.js";

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
    const author = req.user?.id as unknown as Schema.Types.ObjectId;
    const { title, subtitle, story, size, links, hashTags, mentions, location, forte, collectionId } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];

        const media =
            files?.map((file: any) => {
                return {
                    url: `${file.destination}/${file.filename}`,
                    type: mediaType(file.mimetype),
                };
            }) || [];

        const post = await Post.create({
            author,
            title,
            subtitle,
            size,
            story,
            media,
            forte,
            links,
            hashTags,
            mentions,
            location: location,
        });

        if (collectionId) {
            await Collection.findByIdAndUpdate(collectionId, {
                $push: {
                    posts: post.id,
                },
            }, { new: true });
        }

        response.msg = "Post Created Successfully";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Posts of a user
 * @route GET /api/posts/:postId
 */
async function getPostsHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const posts = await Post.find({
            author: userId,
        }).limit(10);

        response.posts = posts;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Get Single post
 * @route POST /api/posts/post/:postId
 */
async function getSpecificPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate({
            path: "applauds",
            select: "fullName username email",
        });

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Post Found";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete a post
 * @route POST /api/posts/post/:postId
 */
async function deletePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndDelete(postId);

        if (post === null) {
            response.msg = "Post Not Found";
            return res.status(404).json(response);
        }

        response.msg = "Post Deleted Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Like Handlers */
async function allLikesHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate("applauds");

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Fetched all users";
        response.users = post.applauds as unknown as IUser[];

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function likePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        const isLiked: boolean = post?.applauds.includes(userId);

        const updatedPost = await Post.findByIdAndUpdate(postId, isLiked ? { $pull: { applauds: userId } } : { $addToSet: { applauds: userId } }, { new: true });

        response.msg = isLiked ? "Unliked Post" : "Liked Post";
        response.post = updatedPost!;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Comment Handler */
async function commentPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const { userId } = req.body;

    const { text } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { user: userId, text: text } },
            },
            { new: true }
        );

        if (!post) {
            response.msg = "No Post Found";
            return res.status(404).json(response);
        }

        response.msg = "Commented Successfully";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { allLikesHandler, commentPostHandler, createPostHandler, deletePostHandler, getPostsHandler, getSpecificPostHandler, likePostHandler };
