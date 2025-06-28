import { CookieOptions, Request, Response } from "express";
import User from "../models/user.js";
import { EmailService } from "../services/email.service.js";
import { IResponse } from "../types/response.js";
import { setErrorDetails } from "../utils/helper.js";
import { encode } from "../utils/jwt.js";

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

        // email service
        await EmailService.sendWelcomeEmail(user);

        const token: string = encode(user);
        response.msg = "User Created Successfully";
        response.token = token;
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        return res.status(201).send(response);
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


        const isProduction = process.env.NODE_ENV === "production"

        const option: CookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax"
        }

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

export { IResponse, loginHandler, signUpHandler };
