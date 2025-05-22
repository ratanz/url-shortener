;
import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlService } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        const shortUrl = await createShortUrlService(url);
        if (shortUrl instanceof Error) {
            return res.status(500).json({ error: "Failed to create short URL" });
        }
        res.send(process.env.APP_URL + shortUrl);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const redirectFromShortUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const url = await getShortUrl(id);
        res.redirect(url.full_url);
    } catch (error) {
        res.status(404).json({ error: "Short URL not found" });
    }
}