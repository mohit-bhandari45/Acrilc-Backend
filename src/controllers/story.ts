import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import Story from "../models/storyboard.js";
import { IResponse } from "./auth.js";

async function createStoryBoardHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;
    const { title, description, media } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };

        const storyBoard = await Story.create({
            author: userId,
            title,
            description,
            media,
        });

        await storyBoard.save();

        response.msg = "StoryBoard created";
        response.data = storyBoard;
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

        const storyBoards = await Story.find({
            author: userId,
        });

        response.msg = "StoryBoards found";
        response.data = storyBoards;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getStoryBoardHandler, createStoryBoardHandler };
