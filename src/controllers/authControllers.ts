import { CookieOptions, Request, Response } from "express";
import User from "../models/user.js";
import emailQueue from "../queues/emailQueue.js";
import { IResponse } from "../types/response.js";
import { setErrorDetails } from "../utils/helper.js";
import { encode } from "../utils/jwt.js";
import { setCookie } from "../utils/setCookie.js";

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

        if (email === process.env.ADMIN_EMAIL) {
            user.role = "admin";
            await user.save();
        }

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

async function googleAuthCallback(req: Request, res: Response): Promise<void> {
    const user = req.user as any;
    const state = req.query.state as string;
    const nextUrl = state && state.startsWith("/") ? state : "/home";
    const frontendUrl = process.env.FRONTEND_URL || "https://acrilc-web.vercel.app";
    const localFrontendUrl = process.env.FRONTEND_URL_LOCAL || "http://localhost:3000";
    const redirectBase = process.env.NODE_ENV === "production" ? frontendUrl : localFrontendUrl;

    const token: string = encode(user);
    const isProduction = process.env.NODE_ENV === "production";

    const option: CookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
    };

    res.cookie("token", token, option);
    res.redirect(`${redirectBase}${nextUrl}`);
}

async function logoutHandler(req: Request, res: Response): Promise<void> {
    console.log("Logout Happening");
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        msg: "Logged Out Successfully",
    });
    return;
}

export { googleAuthCallback, IResponse, loginHandler, logoutHandler, signUpHandler };
