import cors from "cors";
import express, { Express, Request, Response } from "express";
import http from "http";
import os from "os";
import { Server } from "socket.io";
import apiRoutes from "./routes/api/index.js";
import authRoutes from "./routes/auth/auth.js";
import generalRoutes from "./routes/general/general.js";
import publicRoutes from "./routes/public/index.js";
import socketHandler from "./socket.js";

import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./db.js";
import { socketAuthMiddleware } from "./middlewares/socket.js";
import { redisConnect } from "./redis.js";
redisConnect();
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

// request logger
app.use(morgan("dev"));

io.use(socketAuthMiddleware); //socket middleware
io.on("connection", socketHandler(io));

/* Middlewares */
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/general", generalRoutes);
app.use("/public", publicRoutes);

/* Health Route */
const bytetoGb = (bytes: number) => bytes / 1024 ** 3;
app.get("/", (req: Request, res: Response) => {
    const up = Math.floor(os.uptime() / 3600);
    const totalMem = bytetoGb(os.totalmem());
    const freeMem = bytetoGb(os.freemem());
    const usedMem = totalMem - freeMem;

    const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(2);

    const cpuLoad = os.loadavg()[0];

    res.status(200).json({
        msg: "Server is up and running",
        uptime: up + "Hrs",
        memory: {
            total: totalMem.toFixed(2) + "GiB",
            free: freeMem.toFixed(2) + "GiB",
            used: usedMem.toFixed(2) + "GiB",
            usagePercent: memUsagePercent + "%",
        },
        cpu: {
            load: cpuLoad,
        },
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
    });
});

export default server;
