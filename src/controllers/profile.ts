import { Request, Response } from "express";
import { Schema } from "mongoose";
import { IUser } from "../utils/interfaces.js";
import User from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";

interface IResponse {
    msg: string;
    err?: string;
    user?: IUser;
}

async function getProfileHandler(req: Request, res: Response): Promise<any> {
    const ownerId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };
        const user = (await User.findById(ownerId)) as IUser;

        response.msg = "User Found";
        response.user = user;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function updateProfileHandler(req: Request, res: Response): Promise<any> {
    const ownerId = req.user?.id as unknown as Schema.Types.ObjectId;

    const { fullName, username, bio } = req.body;
    const file = req.file;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = (await User.findByIdAndUpdate(
            ownerId,
            {
                fullName: fullName,
                username: username,
                bio: bio,
                profilePicture: file?.filename,
            },
            { new: true }
        )) as IUser;

        response.msg = "User Updated";
        response.user = user;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getProfileHandler, updateProfileHandler };
