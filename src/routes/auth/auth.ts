import { Router } from "express";
import passport from "passport";
import { loginHandler, signUpHandler } from "../../controllers/auth.js"; // Ensure the path is correct

const router = Router();

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

/* Callback url for google */
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    const user = req.user!;
    res.redirect(`http://localhost:your_flutter_port/success?token=${user.token}`);
});

export default router;
