import bcrypt from "bcrypt";
import { Model, Schema, model } from "mongoose";
import { IResponse } from "../controllers/auth.js";
import { IUser } from "../utils/interfaces.js";
import { encode } from "../utils/jwt.js";

interface IUserModel extends Model<IUser> {
    matchPasswordAndGenerateToken(email: string, password: string, response: IResponse): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        newEmail: {
            type: String,
        },
        newEmailToken: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        bio: {
            type: String,
        },
        story: {
            type: String,
        },
        socialLinks: { type: Map, of: String },
        visibility: {
            type: String,
            enum: ["public", "followers", "private"],
        },
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        following: [{ type: Schema.Types.ObjectId, ref: "User" }],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        preferences: [
            {
                type: String,
                enum: ["Woolen Craft", "Poetry", "Exclusive"],
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    const saltRounds = 10; // for complexity
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password, response): Promise<boolean> {
    const user = await this.findOne({ email });

    if (!user) {
        response.msg = "Invalid Email";
        return false;
    }

    const salt: string = user.salt;
    const hashed: string = await bcrypt.hash(password, salt);

    const isMatch: boolean = hashed === user.password;

    if (!isMatch) {
        response.msg = "Invalid Password";
        return false;
    }

    const token: string = encode(user);
    response.msg = "Login Success";
    response.token = token;

    return true;
});

const User = model<IUser, IUserModel>("user", userSchema);
export { IUser };
export default User;
