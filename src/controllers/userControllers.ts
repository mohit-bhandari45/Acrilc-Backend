import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { Schema } from "mongoose";
import Post from "../models/post.js";
import User, { IUser } from "../models/user.js";
import { IResponse } from "../types/response.js";
// import { createTransporter } from "../utils/email.js";
import { EmailService } from "../services/email.service.js";
import { setErrorDetails } from "../utils/helper.js";
import emailQueue from "../queues/emailQueue.js";

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
    const loggedUser = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };
        const user = await User.findOne({
            username: username,
        });
        if (!user) {
            response.msg = "No User";
            return res.status(404).json(response);
        }

        const posts = await Post.find({
            author: user._id,
        });

        user.followers = user.followers ?? [];
        const isFollowed = user.followers.some((id) => id.toString() === loggedUser.toString());

        response.msg = "User Found";
        response.data = {
            _id: user?._id,
            username: user?.username,
            fullName: user?.fullName,
            profilePicture: user?.profilePicture,
            bannerPicture: user?.bannerPicture,
            portfolioURL: user?.portfolioURL,
            bio: user?.bio,
            story: user?.story,
            preferences: user?.preferences,
            isFollowed,
            // services: user?.services,
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

        // const transporter = createTransporter();

        // const mailOptions = {
        //     to: newEmail,
        //     subject: "Verify Your New Email",
        //     html: `<p>Click the link below to verify your new email:</p>
        //         <a href="http://localhost:8000/api/verify-email?token=${token}">Verify Email</a>`,
        // };

        // await transporter.sendMail({
        //     from: process.env.EMAIL_FROM,
        //     ...mailOptions,
        // });

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

/* Password Settings Handlers */

/***
 * @desc Forgot Password
 * @route Get public/password/forgot
 */
async function forgotPasswordHandler(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
        const response: IResponse = {
            msg: "",
        };
        const user = await User.findOne({ email: email });

        if (!user) {
            response.msg = "User not found";
            res.status(404).json(response);
            return;
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hash;
        user.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000); //15 minutes
        await user.save();

        // email service
        await EmailService.sendResetPasswordEmail(user, resetToken);
        emailQueue.add("reset-password", {
            type: "reset",
            user: user,
            resetToken: resetToken,
        });

        response.msg = "Password reset link sent";
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

/***
 * @desc Reset Password
 * @route Get public/reset-password/:token
 */
async function resetPasswordHandler(req: Request, res: Response): Promise<void> {
    const token = req.params.token;
    const { newPassword } = req.body;

    const response: IResponse = { msg: "" };

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: new Date() },
        });

        if (!user) {
            response.msg = "Invalid or expired token";
            res.status(400).json(response);
            return;
        }

        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;

        await user.save();

        response.msg = "Password reset successful";
        res.json(response);
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export {
    addBannerPicHandler,
    addProfilePicHandler,
    changeEmailHandler,
    changePasswordHandler,
    deleteProfilePicHandler,
    forgotPasswordHandler,
    getOwnProfileHandler,
    getPersonalDetailsHandler,
    getUserProfileHandler,
    resetPasswordHandler,
    setPreferencesHandler,
    setUsernameHandler,
    updatePersonalDetailsHandler,
    verifyEmailHandler,
};
