import { Request, Response } from "express";
import User from "../models/user.js";

async function addPortfolioURLHandler(req: Request, res: Response): Promise<any> {
    const { url } = req.body;
    const userId = req.user?.id;

    try {
        const user = await User.findByIdAndUpdate(userId, { portfolioURL: url }, { new: true });

        return res.status(200).json({ msg: "Portfolio URL added" });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong. Please Try again!" });
    }
}

async function checkURLHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId);

        if (user?.portfolioURL) {
            return res.status(409).json({ msg: "Already have a url. Delete it first" });
        }

        return res.status(200).json({ msg: "No URL found" });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong. Please Try again!" });
    }
}

async function getPortfolioHandler(req: Request, res: Response): Promise<any> {
    const { url } = req.query;
    console.log(url);

    try {
        const user = await User.findOne({ portfolioURL: url });
        console.log("This is user", user);

        if (!user) {
            return res.status(400).json({ msg: "No user found!" });
        }

        return res.status(200).json({ msg: "Got user", data: user });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong. Please Try again!" });
    }
}

async function deleteUrlHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: "No user found!" });
        }

        user.portfolioURL = "";
        await user.save();

        return res.status(200).json({ msg: "Deleted URL", data: user });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong. Please Try again!" });
    }
}

export { checkURLHandler, addPortfolioURLHandler, getPortfolioHandler, deleteUrlHandler };
