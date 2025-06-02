import { Request, Response } from "express";
import Project from "../models/marketplace.js";
import { IResponse } from "./auth.js";
import { setErrorDetails } from "../utils/helper.js";

async function createMarketplaceProjectHandler(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { title, year, description, additionalInfo, forte, keywords, contactInfo, url, pricingOptions, showContactInfo, isDraft } = req.body;

    const pricing = {
        currency: pricingOptions[0].currency,
        sizesAndPrices: [] as { size: string; price: string }[],
    };

    pricingOptions.forEach((option: any) => {
        pricing.sizesAndPrices.push({
            size: option.size,
            price: option.price,
        });
    });

    try {
        const pro = await Project.create({
            author: userId,
            title,
            yearOfMaking: year,
            description,
            additionalInfo,
            forte,
            keywords,
            image: url,
            contactInfo,
            showContactInfo,
            pricingOptions: pricing,
            status: isDraft ? "draft" : "published",
        });

        res.status(201).json({ msg: "Project Created!", data: pro._id });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

async function getSingleMarketProjectHandler(req: Request, res: Response): Promise<void> {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(400).json({ msg: "No Project Found!" });
            return;
        }

        res.status(200).json({ msg: "Got Project", data: project });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

async function getAllMarketPlaceApiHandler(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;

    try {
        let response: IResponse = {
            msg: "",
        };

        const projects = await Project.find({
            author: userId,
        });

        response.msg = projects.length === 0 ? "No Projects Found!" : "Got All Projects";
        response.data = projects;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

async function getAllMarketPlaceHandler(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        let response: IResponse = {
            msg: "",
        };

        const projects = await Project.find({
            author: userId,
        })
            .skip(skip)
            .limit(10)
            .sort({ createdAt: -1 });

        response.msg = projects.length === 0 ? "No Projects Found!" : "Got All Projects";
        response.data = projects;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(setErrorDetails("Internal Server Error", error as string));
    }
}

export { createMarketplaceProjectHandler, getSingleMarketProjectHandler, getAllMarketPlaceApiHandler, getAllMarketPlaceHandler };
