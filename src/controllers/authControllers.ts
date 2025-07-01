import { CookieOptions, Request, Response } from "express";
import User from "../models/user.js";
import { EmailService } from "../services/email.service.js";
import { IResponse } from "../types/response.js";
import { setErrorDetails } from "../utils/helper.js";
import { encode } from "../utils/jwt.js";
import { firebaseAdmin } from "../services/firebase-admin.js";
import { setCookie } from "../utils/setCookie.js";
import emailQueue from "../queues/emailQueue.js";

async function signUpHandler(req: Request, res: Response): Promise<any> {
    const { fullName, email, password } = req.body;
    const formattedEmail: string = email.toLowerCase();

    try {
        let response: IResponse = {
            msg: "",
        };

        const existingUser = await User.findOne({
            email: formattedEmail,
        });

        if (existingUser) {
            response.msg = "User Already Exists";
            return res.status(409).json(response);
        }

        const user = await User.create({
            fullName: fullName,
            email: formattedEmail,
            password: password,
        });

        // email service using bullmq
        emailQueue.add("send-email", {
            type: email,
            user: user,
        });

        const token: string = encode(user);
        response.msg = "User Created Successfully";
        response.data = user;
        response.token = token;

        const isProduction = process.env.NODE_ENV === "production";

        const option: CookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
        };

        return res.status(201).cookie("token", response.token, option).send(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json(setErrorDetails("Internal Server Error", err as string));
    }
}

async function loginHandler(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const formattedEmail: string = email.toLowerCase();

    try {
        let response: IResponse = {
            msg: "",
            token: "",
        };

        const check = await User.matchPasswordAndGenerateToken(formattedEmail, password, response);

        const isProduction = process.env.NODE_ENV === "production";

        const option: CookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
        };

        if (check && typeof response.token === "string" && response.token) {
            return res.status(200).cookie("token", response.token, option).json(response);
        } else {
            return res.status(401).json(response);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(setErrorDetails("Internal Server Error", err as string));
    }
}

async function googleAuthHandler(req: Request, res: Response): Promise<void> {
    const { token } = req.body;

    if (!token) {
        res.status(404).json("Token not found");
    }

    try {
        let response: IResponse = {
            msg: "",
            token: null,
        };

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        if (!decodedToken) {
            res.status(404).json("Google Auth Failed");
        }

        const { uid, name, email, picture } = decodedToken;
        const user = await User.findOne({ email });

        if (user) {
            if (user.googleId === uid) {
                const token: string = encode(user);
                response.msg = "User Got Successfully";
                response.token = token;
                response.data = user;
                setCookie(res, token);

                res.status(200).send(response);
                return;
            } else {
                user.googleId = uid;
                if (!user.profilePicture) {
                    user.profilePicture = picture!;
                }
                await user.save();
                const token: string = encode(user);
                response.msg = "User Updated Successfully";
                response.token = token;
                response.data = user;
                setCookie(res, token);

                res.status(200).send(response);
                return;
            }
        } else {
            const newUser = await User.create({
                fullName: name,
                email,
                profilePicture: picture,
                googleId: uid,
            });

            const token: string = encode(newUser);
            response.msg = "User Created Successfully";
            response.token = token;
            response.data = user;
            setCookie(res, token);

            res.status(201).send(response);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(setErrorDetails("Internal Server Error", error as string));
        return;
    }
}

async function logoutHandler(req: Request, res: Response): Promise<void> {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        msg: "Logged Out Successfully",
    });
    return;
}

export { IResponse, loginHandler, signUpHandler, googleAuthHandler, logoutHandler };
