import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import { IResponse } from "./auth.js";
import Post from "../models/post.js";
import { IStoryBoard } from "../types/storyboard.js";

async function createStoryBoardHandler(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const { title, description, media } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };

        const post = await Post.findById(postId);
        if (!post) {
            response.msg = "Post Not Found";
            return res.status(200).json(response);
        }

        post.storyBoard = {
            title,
            description,
            media,
        };

        await post.save();

        response.msg = "StoryBoard created";
        response.data = post?.storyBoard;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getStoryBoardHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        const response: IResponse = {
            msg: "",
        };

        const posts = await Post.find({ author: userId });

        const storyBoards: IStoryBoard[] = posts
            .filter((post) => post.storyBoard !== undefined)
            .map((post) => post.storyBoard);


        response.msg = "StoryBoards found";
        response.data = storyBoards;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getStoryBoardHandler, createStoryBoardHandler };
