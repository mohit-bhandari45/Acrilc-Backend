import { Request, Response } from "express";
import { Schema } from "mongoose";
import User, { IUser } from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import bcrypt from "bcrypt";
import { createTransporter } from "../utils/email.js";

interface IResponse {
    msg: string;
    err?: string;
    preferences?: string;
    user?: Partial<IUser>;
    profilePic?: string;
    link?: string;
    username?: string;
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
            bio: user?.bio,
            story: user?.story,
            profilePicture: user?.profilePicture,
            socialLinks: user?.socialLinks,
            visibility: user?.visibility,
            preferences: user?.preferences,
        };

        response.msg = "User Found";
        response.user = updatedUserDetails;

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Set Username Handler
 * @route POST api/user/username
 */
async function setUsernameHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { username } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    username: username,
                },
            },
            { new: true }
        );

        response.msg = "Username Set";
        response.username = username;
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
    const { fullName, username, bio, story, socialLinks, visibility, preferences } = req.body;

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
                    story: story && story,
                    socialLinks: socialLinks && socialLinks,
                    visibility: visibility && visibility,
                    preferences: preferences && preferences,
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
        console.log(error);
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

/* Account and Settings */
async function changeEmailHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { newEmail } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };
        const token = await bcrypt.genSalt(10);

        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    newEmail: newEmail,
                    newEmailToken: token,
                },
            },
            { new: true }
        );

        const transporter = createTransporter();

        const mailOptions = {
            to: newEmail,
            subject: "Verify Your New Email",
            html: `<p>Click the link below to verify your new email:</p>
                <a href="http://localhost:8000/api/verify-email?token=${token}">Verify Email</a>`,
        };

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...mailOptions,
        });

        console.log("Verification Email Sent");

        response.msg = "Verification email sent. Please check your inbox.";
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function verifyEmailHandler(req: Request, res: Response): Promise<any> {
    const { token } = req.query;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findOne({
            newEmailToken: token,
        });

        if (!user) {
            response.msg = "User not found";
            return res.status(404).json(response);
        }

        user.email = user.newEmail!;
        user.newEmail = null;
        user.newEmailToken = null;

        await user.save();

        response.msg = "Email successfully updated!";
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function changePasswordHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { currentPassword, newPassword } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const user = await User.findById(userId);
        if (!user) {
            response.msg = "User not found";
            return res.status(404).json(response);
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            response.msg = "Current password is incorrect";
            return res.status(400).json(response);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.save();

        response.msg = "Password Changed Successfully";
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export {
    getOwnProfileHandler,
    getUserProfileHandler,
    setUsernameHandler,
    getPersonalDetailsHandler,
    updatePersonalDetailsHandler,
    addProfilePicHandler,
    updateProfilePicHandler,
    deleteProfilePicHandler,
    setPreferencesHandler,
    changeEmailHandler,
    verifyEmailHandler,
    changePasswordHandler,
};
