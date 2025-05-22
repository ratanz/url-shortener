import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config('./.env');
import connectDB from './src/config/mongoconfig.js';
import urlSchema from './src/models/shorturl.model.js';
import short_url from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/controllers/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// prevents duplicate URL entries
app.use('/api/create', short_url)

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});
