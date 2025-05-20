import { generateNanoId } from "../utils/helper.js";

export const createShortUrl = async (req, res) => {
    const { url } = req.body;
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url });
        if (existing) {
            // Return the existing short URL
            return res.json({ shortUrl: existing.short_url, message: 'URL already exists' });

        }
        // Create a new short URL
        const shortUrl = generateNanoId(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl,
        });
        await newUrl.save();
        res.json({ nanoid: shortUrl, message: 'URL created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
