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
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            required: true,
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
        socialLinks: { type: Map, of: String },
        following: [{ type: Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    const saltRounds = 10; // for complexity
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.salt = salt;
    console.log(this.salt);
    console.log(salt);
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
