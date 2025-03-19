import { Request, Response } from "express";
import { Schema } from "mongoose";
import User, { IUser } from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

interface IResponse {
    msg: string;
    err?: string;
    preferences?: string;
    user?: Partial<IUser>;
    profilePic?: string;
    link?: string
}

/* Getting Profiles */

/***
 * @desc Get Own Profile
 * @route Get api/user/me
 */
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

/***
 * @desc Get Own Profile
 * @route Get api/user/:userId
 */
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

/* General Settings Handlers */

/***
 * @desc Get Personal General Details
 * @route Get api/user/
 */
async function getPersonalDetailsHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        const response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId);

        const updatedUserDetails: Partial<IUser> = {
            username: user?.username,
            fullName: user?.fullName,
            profilePicture: user?.profilePicture,
            socialLinks: user?.socialLinks,
            bio: user?.bio,
        };

        response.msg = "User Found";
        response.user = updatedUserDetails;

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update Personal General Details
 * @route PUT api/user/
 */
async function updatePersonalDetailsHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { username, fullName, bio } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    username: username && username,
                    fullName: fullName && fullName,
                    bio: bio && bio,
                },
            },
            { new: true }
        );

        response.msg = "User Updated";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Add Social Links
 * @route Post api/user/social-links
 */
async function addSocialLinkHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { platform, url } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };

        const user = (await User.findById(userId))!;

        if (!user.socialLinks) {
            user.socialLinks = new Map<string, string>();
        }

        user.socialLinks.set(platform, url);
        await user.save();

        response.msg = "Link Added";
        response.link = url;
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Add Personal General Details
 * @route POST api/user/profile-pic
 */
async function addProfilePicHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let r: IResponse = {
            msg: "",
        };

        const file = req.file;
        const formData = new FormData();
        formData.append("image", fs.createReadStream(file!.path));

        const response = await axios.post("https://api.imgbb.com/1/upload?key=34cb3d0fe2362f6b0dcf3fcd9e8860b6", formData);

        const imageUrl = response.data.data.url;

        fs.unlinkSync(file?.path!);

        await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: imageUrl,
            },
            { new: true }
        );

        r.msg = "Profile Pic Added";
        r.profilePic = imageUrl;
        return res.status(200).json(r);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update Personal General Details
 * @route PUT api/user/profile-pic
 */
async function updateProfilePicHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let r: IResponse = {
            msg: "",
        };

        const file = req.file;
        const formData = new FormData();
        formData.append("image", fs.createReadStream(file!.path));

        const response = await axios.post("https://api.imgbb.com/1/upload?key=34cb3d0fe2362f6b0dcf3fcd9e8860b6", formData);

        const imageUrl = response.data.data.url;

        fs.unlinkSync(file?.path!);

        await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: imageUrl,
            },
            { new: true }
        );

        r.msg = "Profile Pic Updated";
        r.profilePic = imageUrl;
        return res.status(200).json(r);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Delete Personal General Details
 * @route Delete api/user/profile-pic
 */
async function deleteProfilePicHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;

    try {
        let response: IResponse = {
            msg: "",
        };

        await User.findByIdAndUpdate(userId, { profilePicture: null }, { new: true });

        response.msg = "Profile Pic Deleted";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/* Preferences Handler */

/***
 * @desc Get Preferences Details
 * @route Get api/user/preferences
 */

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

/***
 * @desc Set Preferences Details
 * @route POST api/user/preferences
 */

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

/***
 * @desc Update(Change or Delete) Preferences Details
 * @route PUT api/user/preferences
 */

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

export {
    getOwnProfileHandler,
    getUserProfileHandler,
    getPersonalDetailsHandler,
    updatePersonalDetailsHandler,
    addSocialLinkHandler,
    addProfilePicHandler,
    updateProfilePicHandler,
    deleteProfilePicHandler,
    getPreferencesHandler,
    setPreferencesHandler,
    updatePreferenceHandler,
};
