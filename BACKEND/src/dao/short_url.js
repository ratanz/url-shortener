import urlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, fullUrl, useId) => {
    try {
        const newUrl = new urlSchema({
            full_url: fullUrl,
            short_url: shortUrl,
        });
        if (useId) {
            newUrl.user = useId;
        }
        await newUrl.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError("Short URL already exists");
        }
        throw new Error(error);
    }
}

export const getShortUrl = async (shortUrl) => {
    try {
        const url = await urlSchema.findOneAndUpdate(
            { short_url: shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );
        if (!url) {
            throw new Error("Short URL not found");
        }
        return url;
    } catch (error) {
        console.error("Error retrieving short URL:", error);
        throw error;
    }
}