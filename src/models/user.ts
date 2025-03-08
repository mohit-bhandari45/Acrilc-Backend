import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    salt: string;
    profilePicture: string;
    bio: string;
    socialLinks: Map<string, string>;
    following: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    role: "user" | "admin";
}

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
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
});

const User = model<IUser>("user", userSchema);
export default User;

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    this.salt = salt;
    this.password = hashedPassword;

    next();
});
