import { Request, Response } from "express";
import { IResponse } from "./auth.js";
import nlp from "compromise";
import { setErrorDetails } from "../utils/helper.js";

async function getKeywordsHandler(req: Request, res: Response): Promise<void> {
    const { title, story } = req.body;

    try {
        let response: IResponse = {
            msg: "",
        };
        const fullText = `${title}. ${story}`;

        const doc = nlp(fullText);

        let keywords = doc.nouns().out("array");

        keywords = [...new Set(keywords.map((k: string) => k.toLowerCase()))];

        response.msg = "Got all keywords";
        response.data = keywords;
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(setErrorDetails("Something Went Wrong!", error as string));
    }
}

export { getKeywordsHandler };
