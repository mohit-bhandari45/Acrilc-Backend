import express, { Express, Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./routes/api/index.js";
import authRoutes from "./routes/auth/auth.js";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
import { connectDB } from "./db.js";
dotenv.config();
connectDB();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message);
    });
});

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/up", (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Server is up and running",
    });
});

export default server;
