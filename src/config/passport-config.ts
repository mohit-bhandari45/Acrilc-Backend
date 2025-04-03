import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js";
import { encode } from "../utils/jwt.js";
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Create a new user if they don't exist
                    user = await User.create({
                        googleId: profile.id,
                        fullName: profile.displayName,
                        email: profile.emails![0].value,
                        profilePicture: profile.photos![0].value,
                    });
                }

                const token = encode(user);
                return done(null, { ...user, token });
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);
