;
import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlService } from "../services/short_url.service.js";
import { createShortUrlServiceWithUser } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
    const { url } = req.body;
    const shortUrl = await createShortUrlService(url);
    res.send(process.env.APP_URL +  shortUrl);
}

export const redirectFromShortUrl = async (req, res) => {
    const {id} = req.params
    const url = await getShortUrl(id);
    res.redirect(url.full_url);
}