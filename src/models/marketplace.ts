import mongoose, { Model, Schema } from "mongoose";
import { IMarketplace } from "../types/marketplace.js";

export interface ProjectDocument extends IMarketplace, Document {}

const SizesAndPriceSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const PricingOptionsSchema = new mongoose.Schema(
    {
        currency: { type: String, required: true },
        sizesAndPrices: {
            type: [SizesAndPriceSchema],
            required: true,
        },
    },
    { _id: false }
);

const ProjectSchema = new mongoose.Schema<ProjectDocument>({
    author: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    yearOfMaking: { type: String, required: true },
    description: { type: String, required: true },
    pricingOptions: PricingOptionsSchema,
    additionalInfo: { type: String },
    forte: { type: String, required: true },
    keywords: { type: String, required: true },
    contactInfo: { type: String },
    showContactInfo: { type: Boolean, required: true },
    status: { type: String, enum: ["draft", "published"] },
});

const Project: Model<ProjectDocument> = mongoose.model<ProjectDocument>("marketplace", ProjectSchema);
export default Project;
