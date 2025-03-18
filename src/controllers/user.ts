import { Request, Response } from "express";
import { setErrorDetails } from "../utils/helper.js";
import User, { IUser } from "../models/user.js";
import { Schema } from "mongoose";

interface IResponse {
    msg: string;
    err?: string;
    preferences?: string;
    userId?: string;
}

async function getPreferencesHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId);

        response.msg = "Preferenes Found";
        response.preferences = user?.preferences;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function setPreferencesHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { preferences } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    preferences: preferences,
                },
            },
            { new: true }
        );

        response.msg = "Preferences Added Successfully";
        response.preferences = user?.preferences;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function updatePreferenceHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { preferences } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    preferences: preferences,
                },
            },
            { new: true }
        );

        response.msg = "Preferences Updated Successfully";
        response.preferences = user?.preferences;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { getPreferencesHandler, setPreferencesHandler, updatePreferenceHandler };
