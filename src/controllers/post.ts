import { Request, Response } from "express";
import { Express } from "express";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IPost } from "../utils/interfaces.js";

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
    post?: IPost
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
        });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function likePostHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const id = "652f8ae19bde3f001d432bad";

    try {
        let response: IResponse = {
            msg: "",
        };
        const updatedPost = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: id } }, { new: true });

        response.msg = "Post not found.";
        if (!updatedPost) return res.status(404).json({ message: "Post not found." });

        response.msg = "Post Updated Successfully";
        response.post = updatedPost;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { createPostHandler, getPostHandler, likePostHandler };
