import { Request, Response } from "express";
import Project from "../models/marketplace.js";

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

export { createMarketplaceProjectHandler, getSingleMarketProjectHandler };
