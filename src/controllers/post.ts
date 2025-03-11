import { Request, Response } from "express";
import { Express } from "express";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IPost, IUser } from "../utils/interfaces.js";
import { Schema } from "mongoose";
import User from "../models/user.js";

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

interface IResponse {
    msg: string;
    post?: IPost;
    users?: IUser[];
}

async function createPostHandler(req: Request, res: Response): Promise<any> {
    const { text, links, hashTags, author, mentions, poll, location } = req.body;

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
            text: text,
            media: media,
            author: author,
            links: links,
            hashTags: hashTags,
            mentions: mentions,
            poll: poll,
            location: location,
        });

        response.msg = "Post Created Successfully";
        response.post = post;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getPostHandler(req: Request, res: Response): Promise<any> {
    const id = "652f8ae19bde3f001d432bad";

    try {
        const posts = await Post.find({
            author: id,
        }).limit(10);

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getSpecificPostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate({
            path: "likes",
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

/* Like Handlers */
async function allLikesHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId).populate({
            path: "likes",
            select: "fullName email",
        });

        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        response.msg = "Fetched all users";
        response.users = post.likes as unknown as IUser[];

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function likePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const id = "652f8ae19bde3f001d432bad" as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        console.log(response, postId);

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not found";
            return res.status(404).json(response);
        }

        const isLiked: boolean = post?.likes.includes(id);

        const updatedPost = await Post.findByIdAndUpdate(postId, isLiked ? { $pull: { likes: id } } : { $addToSet: { likes: id } }, { new: true });

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
    const id = "652f8ae19bde3f001d432bad" as unknown as Schema.Types.ObjectId;

    const { text } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { user: id, text: text } },
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

export { createPostHandler, getPostHandler, getSpecificPostHandler, allLikesHandler, likePostHandler, commentPostHandler };
