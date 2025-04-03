import { Request, Response } from "express";
import Post from "../models/post.js";
import { IResponse } from "./auth.js";

async function discoverHandler(req: Request, res: Response): Promise<any> {
    try {
        let response: IResponse = {
            msg: "",
        };
        const { cursor, limit = 10, forte } = req.query;

        let query: any = {};

        if (forte) {
            query.forte = forte;
        }

        if (cursor) {
            query._id = { $lt: cursor };
        }

        const posts = await Post.find(query).sort({ _id: -1 }).limit(Number(limit));

        const nextCursor = posts.length > 0 ? posts[posts.length - 1]._id : null;
        response.msg = "Discovered";
        response.posts = posts;
        response.cursor = nextCursor! as unknown as string;
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export { discoverHandler };
