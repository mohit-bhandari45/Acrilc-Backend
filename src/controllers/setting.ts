import { Schema } from "mongoose";
import { IUser } from "../utils/interfaces.js";
import User from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";
import Post from "../models/post.js";
import { Request, Response } from "express";

interface IResponse {
    msg: string;
    err?: string;
    user?: IUser;
}

async function updateProfileHandler(req: Request, res: Response): Promise<any> {
    const ownerId = req.user?.id as unknown as Schema.Types.ObjectId;

    const { fullName, username, bio } = req.body;
    const file = req.file;

    console.log(fullName, username, bio, file);

    const pUser: Partial<IUser> = {
        ...(fullName && { fullName }),
        ...(username && { username }),
        ...(bio && { bio }),
        ...(file && { profilePicture: file.filename }),
    };

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = (await User.findByIdAndUpdate(
            ownerId,
            {
                $set: pUser,
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

async function deleteProfileHandler(req: Request, res: Response): Promise<any> {
    const ownerId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findByIdAndDelete(ownerId);

        if (!user) {
            response.msg = "User already deleted";
            return res.status(404).json(response);
        }

        /* Additonally we can remove the token as well */

        await Post.findOneAndDelete({
            author: ownerId,
        });

        response.msg = "User Deleted Successfully";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { updateProfileHandler, deleteProfileHandler };
