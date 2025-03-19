import { Request, Response } from "express";
import { Schema } from "mongoose";
import User from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";
import { IUser } from "../utils/interfaces.js";

interface IResponse {
    msg: string;
    err?: string;
    user?: IUser;
    userId?: string;
}

async function getOwnProfileHandler(req: Request, res: Response): Promise<any> {
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

async function getUserProfileHandler(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };
        const user = (await User.findById(userId)) as IUser;

        response.msg = "User Found";
        response.user = user;

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getOwnProfileHandler, getUserProfileHandler };
