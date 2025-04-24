import { Request, Response } from "express";
import Post from "../models/post.js";
import { setErrorDetails } from "../utils/helper.js";
import { IResponse } from "../types/response.js";

/**
 * @route GET /api/discover/trending
 * @desc Returns all the trending fortes
 * */
async function getTrendingForteHandler(req: Request, res: Response): Promise<any> {
    try {
        let trendingFortes = await Post.aggregate([
            {
                $group: {
                    _id: "$forte",
                    totalScore: { $sum: "$score" },
                    postCount: { $sum: 1 },
                },
            },
            { $sort: { totalScore: -1 } },
        ]);

        trendingFortes = trendingFortes.filter((forte) => {
            return forte._id != undefined;
        });

        trendingFortes = await Promise.all(
            trendingFortes.map(async (forte) => {
                const posts = await Post.find({
                    forte: forte._id,
                });
                const sorted = posts.sort((a, b) => (b.score || 0) - (a.score || 0));
                forte.topPostURL = sorted[0].thumbnail;
                console.log(forte);
                return forte;
            })
        );

        return res.status(200).json(trendingFortes);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @route GET /api/discover/?text=Explore&limit=10&cursor="wkenfwefwe"
 * @desc Returns all the the posts on text based search
 * */
async function discoverHandler(req: Request, res: Response): Promise<any> {
    try {
        let response: IResponse = {
            msg: "",
        };

        const { text } = req.query;
        const limit = Number(req.query.limit) || 10;
        const cursor = req.query.cursor;

        const match: Record<string, any> = { $text: { $search: text } };

        if (cursor) {
            match.createdAt = { $lt: cursor };
        }

        const posts = await Post.find(match, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" }, createdAt: -1 })
            .limit(limit);

        response.data = posts;
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/**
 * @route GET /api/discover/forte/?forte="AI"
 * @desc Returns all the the posts on forte
 * */
async function getAllFortePosts(req: Request, res: Response): Promise<any> {
    const { forte } = req.query;

    try {
        const posts = await Post.find({
            forte: forte,
        });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getTrendingForteHandler, discoverHandler, getAllFortePosts };
