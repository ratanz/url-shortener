import urlSchema from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, fullUrl, useId) => {
    const newUrl = new urlSchema({
        full_url: fullUrl,
        short_url: shortUrl,
    });
    if(useId){
        newUrl.id = useId;
    }
    await newUrl.save();
}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOne({ short_url: shortUrl });
}