import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth/auth.js";
import apiRoutes from "./routes/api/index.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir: string = path.resolve(__dirname, "..");

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/up", (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Server is up and running",
    });
});

export default app;
