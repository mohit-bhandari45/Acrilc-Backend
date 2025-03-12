import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth/auth.js";
import apiRoutes from "./routes/api/index.js";

dotenv.config();
connectDB();

const app: Express = express();

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/up", (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Server is up and running",
    });
});

export default app;
