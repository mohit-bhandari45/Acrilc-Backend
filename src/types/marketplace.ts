import { Schema } from "mongoose";

type Preference =
    | "Woolen Craft"
    | "Poetry"
    | "Exclusive"
    | "Paintings"
    | "Sculptures"
    | "Wooden Crafts"
    | "Textile Art"
    | "Ceramics"
    | "Jewelry Design"
    | "Glass Art"
    | "Metalwork"
    | "Paper Crafts"
    | "Mixed Media"
    | "Photography"
    | "Digital Art"
    | "Calligraphy"
    | "Printmaking"
    | "Mosaic Art"
    | "Leatherwork"
    | "Pottery"
    | "Fiber Art"
    | "Illustration"
    | "Installation Art";

export interface IMarketplace {
    author: Schema.Types.ObjectId;
    image: string;
    title: string;
    yearOfMaking: string;
    description: string;
    pricingOptions: {
        currency: string;
        sizesAndPrices: {
            size: string;
            price: Number;
        };
    };
    additionalInfo: string;
    forte: Preference;
    keywords: string;
    contactInfo: string;
    showContactInfo: boolean;
    status: "draft" | "published";
}
