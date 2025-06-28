import { Response } from "express";

async function setCookie(res: Response, token: string) {
    res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
}

export { setCookie };
