import mongoose from "mongoose";

async function connectDB() {
    mongoose
        .connect(process.env.MONGO_URI!)
        .then(() => console.log("DB connection success"))
        .catch((err) => console.log(err));
}

export { connectDB };
