import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config('./.env');
import connectDB from './src/config/mongoconfig.js';
import urlSchema from './src/models/shorturl.model.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/api/create', (req, res) => {
//     const { url } = req.body;
//     const shortUrl = nanoid(7);
//     const newUrl = new urlSchema({
//         full_url: url,
//         short_url: shortUrl,
//     });
//     newUrl.save();
//     res.send(nanoid(7))
// });

// prevents duplicate URL entries
app.post('/api/create', async (req, res) => {
    const { url } = req.body;
    try {
        // Check if the URL already exists
        let existing = await urlSchema.findOne({ full_url: url });
        if (existing) {
            // Return the existing short URL
            return res.json({ shortUrl: existing.short_url, message: 'URL already exists' });

        }
        // Create a new short URL
        const shortUrl = nanoid(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl,
        });
        await newUrl.save();
        res.json({  nanoid: shortUrl, message: 'URL created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const url = await urlSchema.findOne({ short_url: id});
    if (url) {
        res.redirect(url.full_url);
    }
    else {
        res.status(404).send('URL not found');
    }
});


app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});
