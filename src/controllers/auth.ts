import { Request, Response } from "express";
import User from "../models/user.js";

async function signUpHandler(req: Request, res: Response): Promise<any> {
    const body = req.body;

    const user = await User.create(body);

    return res.send("<h1>Hello</h1>");
}

export { signUpHandler };
