import { Request, Response } from "express";
import User from "../models/user.js";

async function getFeaturedArtistsHandler(req: Request, res: Response): Promise<any> {
    try {
        const users = await User.find({});
        return res.status(200).json({ data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error. Please try again!" });
    }
}

export { getFeaturedArtistsHandler };
