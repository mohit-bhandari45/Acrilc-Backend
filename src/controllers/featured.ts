import { Request, Response } from "express";
import User from "../models/user.js";
import { IResponse } from "./auth.js";
import Post from "../models/post.js";
import Project from "../models/marketplace.js";
import { IPost } from "../types/post.js";

async function getFeaturedArtistsHandler(req: Request, res: Response): Promise<void> {
    try {
        const artists = await User.find();

        let response: IResponse = { msg: "Artists found", data: artists };

        res.status(200).json(response);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ mag: "Internal server error" });
    }
}

async function getFeaturedArtsHandler(req: Request, res: Response): Promise<any> {
    try {
        const arts = await Post.find({});

        const groupedData: Record<string, IPost[]> = {};
        arts.forEach((art: IPost) => {
            const category = art.forte;

            if (!groupedData[category]) {
                groupedData[category] = [];
            }
            groupedData[category].push(art);
        });

        let response: IResponse = { msg: "Arts found", data: groupedData };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error. Please try again!" });
    }
}

async function getFeaturedMarketsHandler(req: Request, res: Response): Promise<any> {
    try {
        const arts = await Project.find({});
        let response: IResponse = { msg: "Projects found", data: arts };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error. Please try again!" });
    }
}

export { getFeaturedArtistsHandler, getFeaturedArtsHandler, getFeaturedMarketsHandler };
