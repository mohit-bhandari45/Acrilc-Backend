import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";

passport.serializeUser((user: any, done) => done(null, user._id.toString()));

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err as Error);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL ||
                `${
                    process.env.NODE_ENV === "production" ? process.env.BACKEND_URL || "https://acrilc-backend.onrender.com" : process.env.BACKEND_URL_LOCAL || "http://localhost:8000"
                }/auth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const googleId = profile.id;
                const name = profile.displayName;
                const picture = profile.photos?.[0]?.value ?? "";

                if (!email) return done(new Error("No email provided by Google"));

                let user = await User.findOne({ email });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = googleId;
                        if (!user.profilePicture) user.profilePicture = picture;
                        await user.save();
                    }
                    return done(null, user as any);
                }

                const newUser = await User.create({
                    fullName: name,
                    email,
                    profilePicture: picture,
                    googleId,
                });

                return done(null, newUser as any);
            } catch (err) {
                return done(err as Error);
            }
        }
    )
);

export default passport;
