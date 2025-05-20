import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";

export const createShortUrlService = async (url) => {
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url });
        if (existing) {
            // Return the existing short URL
            return existing.short_url;

        }
        // Create a new short URL
        const shortUrl = generateNanoId(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl + '/',
        });
        await newUrl.save();
        return shortUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        return error;
    }
}