import User from "../models/user.js";
import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import { IResponse } from "../types/response.js";
import { Schema } from "mongoose";

async function followUnfollowHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;
    const loggedUser = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId);
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.followers = user.followers ?? [];
        const isFollowed = user.followers.some((id) => id.toString() === loggedUser);

        user.followers = isFollowed ? user.followers.filter((id) => id.toString() !== loggedUser) : [...user.followers, loggedUser as unknown as Schema.Types.ObjectId];

        await user.save();
        response.msg = isFollowed ? "User Unfollowed" : "User Followed";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getAllFollowersHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId).populate("followers");
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.followers = user.followers ?? [];

        response.msg = "Got Followers";
        response.data = user.followers;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getAllFollowingHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId).populate("following");
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        user.following = user.following ?? [];

        response.msg = "Got Following";
        response.data = user.following;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { followUnfollowHandler, getAllFollowersHandler, getAllFollowingHandler };
