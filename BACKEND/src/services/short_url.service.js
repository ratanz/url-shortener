import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlService = async (url) => {
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url });
        if (existing) {
            // Return the existing short URL
            return existing.short_url
        }

        // Create a new short URL
        const shortUrl = generateNanoId(7);
        await saveShortUrl(shortUrl, url);
        return shortUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        return error;
    }
}

export const createShortUrlServiceWithUser = async (url, userId) => {
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url, });
        if (existing) {
            // Return the existing short URL
            return existing.short_url
        }

        // Create a new short URL
        const shortUrl = generateNanoId(7);
        await saveShortUrl(shortUrl, url, userId);
        return shortUrl;
    } catch (error) {
        console.error('Error creating short URL:', error);
        return error;
    }
}