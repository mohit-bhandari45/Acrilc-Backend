import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth/auth.js";
dotenv.config();
connectDB();

const app: Express = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

export default app;
