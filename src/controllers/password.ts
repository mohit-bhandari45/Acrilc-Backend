import crypto from "crypto";
import { Request, Response } from "express";
import User from "../models/user.js";
import { EmailService } from "../services/email.service.js";
import { IResponse } from "./auth.js";

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

        response.msg = "Password reset link sent";
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

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

export { forgotPasswordHandler, resetPasswordHandler };
