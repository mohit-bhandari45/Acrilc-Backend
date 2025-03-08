import { Request, Response } from "express";
import User from "../models/user.js";

async function signUpHandler(req: Request, res: Response): Promise<any> {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            email: email,
        });

        if (existingUser) {
            return res.status(409).json({ msg: "User Already Exists" });
        }

        const user = await User.create({
            username: username,
            email: email,
            password: password,
        });

        return res.status(201).send({ msg: "User Created Successfully", user: user });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err });
    }
}

export { signUpHandler };
