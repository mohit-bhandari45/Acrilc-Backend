import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT) || 5000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log("Listening to PORT:" + PORT);
});
