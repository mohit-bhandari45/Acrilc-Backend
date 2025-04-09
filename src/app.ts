import cors from "cors";
import express, { Express, Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api/index.js";
import authRoutes from "./routes/auth/auth.js";
import socketHandler from "./socket.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { socketAuthMiddleware } from "./middlewares/socket.js";
dotenv.config();
connectDB();

const app: Express = express();
const server = http.createServer(app);

/* Socket IO */
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.use(socketAuthMiddleware); //socket middleware
io.on("connection", socketHandler(io));

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
