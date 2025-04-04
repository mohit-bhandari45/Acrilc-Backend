import { Request, Response } from "express";
import Post from "../models/post.js";
import { IResponse } from "./auth.js";
import { IStats } from "../types/stats.js";
import { setErrorDetails } from "../utils/helper.js";

/**
 * @route GET /api/discover/trending
 * @desc Returns all the trending fortes 
 * */
async function getTrendingForteHandler(req: Request, res: Response): Promise<any> {
    try {
        const posts = await Post.find();

        const now = new Date();
        const forteStats: Record<string, IStats> = {};

        posts.forEach((post) => {
            const forte = post.forte;
            if (!forteStats[forte]) {
                forteStats[forte] = {
                    postCount: 0,
                    totalApplauds: 0,
                    totalComments: 0,
                    totalReplies: 0,
                    recentPostCount: 0,
                    score: 0,
                };
            }

            const applauds = post.applauds.length;
            const comments = post.comments.length;
            const replies = post.comments.reduce((total, comment) => total + (comment.replies?.length || 0), 0);

            const hoursSinceCreation = (now.getTime() - post.createdAt.getTime()) / 36e5;
            const isRecent = hoursSinceCreation < 24;

            forteStats[forte].postCount += 1;
            forteStats[forte].totalApplauds += applauds;
            forteStats[forte].totalComments += comments;
            forteStats[forte].totalReplies += replies;
            if (isRecent) forteStats[forte].recentPostCount += 1;
        });

        /* Calculating Score */
        Object.keys(forteStats).forEach((forte) => {
            const data = forteStats[forte];
            data.score = data.totalApplauds * 3 + data.totalComments * 2 + data.totalReplies + data.recentPostCount * 5;
        });

        /* Sorting */
        const trendingFortes = Object.entries(forteStats)
            .sort(([, a], [, b]) => b.score - a.score)
            .map(([forte, data]) => ({
                forte,
                ...data,
            }));

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

        console.log(posts.length);

        response.posts = posts;
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
