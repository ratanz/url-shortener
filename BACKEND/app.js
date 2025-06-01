import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config('./.env');
import connectDB from './src/config/mongoconfig.js';
import urlSchema from './src/models/shorturl.model.js';
import short_url from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/controllers/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import auth from './src/routes/auth.route.js';
import protected_routes from './src/routes/protected.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:5175', 'http://127.0.0.1:5175'], // Vite ports
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// API routes
app.use('/api/auth', auth)
app.use('/api/create', short_url)
app.use('/api/protected', protected_routes)

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});
