import urlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, fullUrl, userId) => {
    try {
        console.log('Saving URL with user ID:', userId || 'anonymous');
        
        const newUrl = new urlSchema({
            full_url: fullUrl,
            short_url: shortUrl,
        });
        
        // Associate URL with user if userId is provided
        if (userId) {
            newUrl.user = userId;
        }
        
        const savedUrl = await newUrl.save();
        console.log('URL saved successfully:', savedUrl);
        return savedUrl;
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