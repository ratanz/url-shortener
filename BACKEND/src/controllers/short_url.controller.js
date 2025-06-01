;
import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlService, createShortUrlServiceWithUser } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        let userId = null;
        
        // Check if the request has an authenticated user
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                try {
                    // Import the verify token function
                    const { verifyToken } = await import('../utils/helper.js');
                    const decoded = verifyToken(token);
                    if (decoded && decoded.id) {
                        userId = decoded.id;
                        console.log('Creating URL for authenticated user:', userId);
                    }
                } catch (tokenError) {
                    console.error('Token verification error:', tokenError);
                    // Continue without user ID if token is invalid
                }
            }
        }
        
        // Use the appropriate service based on whether user is authenticated
        const shortUrl = userId 
            ? await createShortUrlServiceWithUser(url, userId)
            : await createShortUrlService(url);
            
        if (shortUrl instanceof Error) {
            return res.status(500).json({ error: "Failed to create short URL" });
        }
        // Return the full URL including the backend server address
        res.send(`http://localhost:3000/${shortUrl}`);
    } catch (error) {
        console.error('Error in createShortUrl controller:', error);
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