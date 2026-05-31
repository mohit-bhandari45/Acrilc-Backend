import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import "../../services/passport.js";
import { googleAuthCallback, loginHandler, logoutHandler, signUpHandler } from "../../controllers/authControllers.js";
import { verifyEmailHandler } from "../../controllers/userControllers.js";

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

router.get("/google", (req: Request, res: Response, next: NextFunction) => {
    const next_url = (req.query.next as string) || "/home";
    (
        passport.authenticate("google", {
            scope: ["profile", "email"],
            state: next_url,
        }) as any
    )(req, res, next);
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${
            process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL || "https://acrilc-web.vercel.app" : process.env.FRONTEND_URL_LOCAL || "http://localhost:3000"
        }/auth/login`,
    }),
    googleAuthCallback
);

router.get("/logout", logoutHandler);
router.get("/verify-email", verifyEmailHandler);

export default router;
