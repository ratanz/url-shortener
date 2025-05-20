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