import mongoose from "mongoose";

async function connectDB() {
    mongoose.connect("mongodb+srv://mohit45:ohSvOSME2wEjGDga@shortly.p626s.mongodb.net/acrilc").then(() => console.log("DB connection success")).catch((err) => console.log(err));
}

export { connectDB }