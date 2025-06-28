import bcrypt from "bcrypt";
import { Model, Schema, model } from "mongoose";
import { IResponse } from "../controllers/auth.js";
import { IUser } from "../types/user.js";
import { encode } from "../utils/jwt.js";
import { PREFERENCE_ENUM, SERVICES_ENUM } from "../utils/enums.js";

interface IUserModel extends Model<IUser> {
    matchPasswordAndGenerateToken(email: string, password: string, response: IResponse): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            unique: true,
            sparse: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        newEmail: {
            type: String,
        },
        newEmailToken: {
            type: String,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpiry: {
            type: Date,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        password: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        bannerPicture: {
            type: String,
        },
        bio: {
            type: String,
        },
        story: {
            type: String,
        },
        portfolioURL: {
            type: String,
        },
        socialLinks: { type: Map, of: String },
        visibility: {
            type: String,
            enum: ["public"],
            default: "public",
        },
        followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
        following: [{ type: Schema.Types.ObjectId, ref: "user" }],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        preferences: [
            {
                type: String,
                enum: PREFERENCE_ENUM,
            },
        ],
        services: [
            {
                type: String,
                enum: SERVICES_ENUM,
            },
        ],
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    if (this.password && this.password.length > 0) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }

    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password, response): Promise<boolean> {
    const user = await this.findOne({ email });

    if (!user) {
        response.msg = "Invalid Email";
        return false;
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        response.msg = "Invalid Password";
        return false;
    }

    const token: string = encode(user);
    response.msg = "Login Success";
    response.token = token;
    response.data = user;

    return true;
});

const User = model<IUser, IUserModel>("user", userSchema);
export { IUser };
export default User;
