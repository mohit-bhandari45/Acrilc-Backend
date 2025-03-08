import { Request, Response } from "express";
import User, { IUser } from "../models/user.js";
import { setErrorDetails } from "../utils/helper.js";

interface IResponse {
    msg: string;
    token?: string | null;
    user?: IUser;
    err?: string;
}

async function signUpHandler(req: Request, res: Response): Promise<any> {
    const { fullName, email, password } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };

        const existingUser = await User.findOne({
            email: email,
        });

        if (existingUser) {
            response.msg = "User Already Exists";
            return res.status(409).json(response);
        }

        const user = await User.create({
            fullName: fullName,
            email: email,
            password: password,
        });

        response.msg = "User Created Successfully";
        response.user = user;

        return res.status(201).send(response);
    } catch (err) {
        return res.status(500).json(setErrorDetails("Internal Server Error", err as string));
    }
}

async function loginHandler(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
        let response: IResponse = {
            msg: "",
            token: null,
        };

        const check = await User.matchPasswordAndGenerateToken(email, password, response);

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
