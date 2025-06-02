import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/short_url.js";
import dotenv from 'dotenv';
dotenv.config();

export const createShortUrlService = async (url) => {
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url });
        if (existing) {
            // Return the existing short URL
            // Remove trailing slash from APP_URL if it exists
            const baseUrl = process.env.APP_URL.endsWith('/') ? process.env.APP_URL.slice(0, -1) : process.env.APP_URL;
            return `${baseUrl}/${existing.short_url}`
        }

        // Create a new short URL
        const shortUrl = generateNanoId(7);
        await saveShortUrl(shortUrl, url);
        // Remove trailing slash from APP_URL if it exists
        const baseUrl = process.env.APP_URL.endsWith('/') ? process.env.APP_URL.slice(0, -1) : process.env.APP_URL;
        return `${baseUrl}/${shortUrl}`;
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
            // Remove trailing slash from APP_URL if it exists
            const baseUrl = process.env.APP_URL.endsWith('/') ? process.env.APP_URL.slice(0, -1) : process.env.APP_URL;
            return `${baseUrl}/${existing.short_url}`
        }

        // Create a new short URL
        const shortUrl = generateNanoId(7);
        await saveShortUrl(shortUrl, url, userId);
        // Remove trailing slash from APP_URL if it exists
        const baseUrl = process.env.APP_URL.endsWith('/') ? process.env.APP_URL.slice(0, -1) : process.env.APP_URL;
        return `${baseUrl}/${shortUrl}`;
    } catch (error) {
        console.error('Error creating short URL:', error);
        return error;
    }
}