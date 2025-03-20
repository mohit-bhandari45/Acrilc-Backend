import { Request, Response } from "express";
import User from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";
import { encode } from "../utils/jwt.js";
import sendWelcomeEmail from "../utils/email.js";

interface IResponse {
    msg: string;
    token?: string | null;
    err?: string;
}

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

        await sendWelcomeEmail(user);

        const token: string = encode(user);
        response.msg = "User Created Successfully";
        response.token = token;

        return res.status(201).send(response);
    } catch (err) {
        return res.status(500).json(setErrorDetails("Internal Server Error", err as string));
    }
}

async function loginHandler(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const formattedEmail: string = email.toLowerCase();

    try {
        let response: IResponse = {
            msg: "",
            token: null,
        };

        const check = await User.matchPasswordAndGenerateToken(formattedEmail, password, response);

        if (check) {
            return res.status(200).json(response);
        } else {
            return res.status(401).json(response);
        }
    } catch (err) {
        return res.status(500).json(setErrorDetails("Internal Server Error", err as string));
    }
}

export { IResponse, loginHandler, signUpHandler };
