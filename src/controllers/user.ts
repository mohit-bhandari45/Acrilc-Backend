import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Schema } from "mongoose";
import Post from "../models/post.js";
import User, { IUser } from "../models/user.js";
import { IResponse } from "../types/response.js";
import { createTransporter } from "../utils/email.js";
import { setErrorDetails } from "../utils/helper.js";

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
        let user = await User.findById(ownerId);
        const posts = await Post.find({
            author: ownerId,
        });

        response.msg = "User Found";
        response.data = {
            _id: user?._id,
            username: user?.username,
            fullName: user?.fullName,
            profilePicture: user?.profilePicture,
            portfolioURL: user?.portfolioURL,
            bannerPicture: user?.bannerPicture,
            bio: user?.bio,
            story: user?.story,
            preferences: user?.preferences,
            services: user?.services,
            totalFollowers: user?.followers.length,
            totalFollowing: user?.following.length,
            posts: posts.length,
            socialLinks: user?.socialLinks,
        };

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
    const { username } = req.params;

    try {
        let response: IResponse = {
            msg: "",
        };
        const user = await User.findOne({
            username: username,
        });

        const posts = await Post.find({
            author: user!._id,
        });

        response.msg = "User Found";
        response.data = {
            _id: user?._id,
            username: user?.username,
            fullName: user?.fullName,
            profilePicture: user?.profilePicture,
            portfolioURL: user?.portfolioURL,
            bio: user?.bio,
            story: user?.story,
            preferences: user?.preferences,
            services: user?.services,
            totalFollowers: user?.followers.length,
            totalFollowing: user?.following.length,
            posts: posts.length,
            socialLinks: user?.socialLinks,
        };

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
        response.data = updatedUserDetails;

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

    const response: IResponse = {
        msg: "",
    };
    try {
        const exist = await User.findOne({
            username: username,
        });

        if (exist) {
            response.msg = "Username Already Exists";
            return res.status(409).json(response);
        }

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
        response.data = username;
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        response.msg = "Something Went Wrong. Try Again";
        return res.status(500).json(response);
    }
}

/***
 * @desc Update Personal General Details
 * @route PUT api/user/
 */
async function updatePersonalDetailsHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id;
    const { fullName, username, bio, story, socialLinks, visibility, preferences } = req.body;

    const map = new Map();
    if (socialLinks) {
        socialLinks.forEach((link: { [x: string]: any }) => {
            map.set(link["platform"], link["url"]);
        });
    }

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
                    socialLinks: map && map,
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

async function addBannerPicHandler(req: Request, res: Response): Promise<any> {
    /* Controller Logic */
    const userId = req.user?.id;
    const { bannerURL } = req.body;

    try {
        let r: IResponse = {
            msg: "",
        };

        await User.findByIdAndUpdate(
            userId,
            {
                bannerPicture: bannerURL,
            },
            { new: true }
        );

        r.msg = "Banner Pic Added";
        r.data = bannerURL;
        return res.status(200).json(r);
    } catch (error) {
        console.log(error);
        return res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

/***
 * @desc Update Profile Pic
 * @route PUT api/user/profile-pic
 */
async function addProfilePicHandler(req: Request, res: Response): Promise<any> {
    const userId = req.user?.id as unknown as Schema.Types.ObjectId;
    const { imageURL } = req.body;
    try {
        let r: IResponse = {
            msg: "",
        };

        await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: imageURL,
            },
            { new: true }
        );

        r.msg = "Profile Pic Added";
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
        response.data = user?.preferences;
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
    addBannerPicHandler,
    addProfilePicHandler,
    changeEmailHandler,
    changePasswordHandler,
    deleteProfilePicHandler,
    getOwnProfileHandler,
    getPersonalDetailsHandler,
    getUserProfileHandler,
    setPreferencesHandler,
    setUsernameHandler,
    updatePersonalDetailsHandler,
    verifyEmailHandler,
};
