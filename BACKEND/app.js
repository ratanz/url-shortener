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
const allowedOrigins = [
  'http://localhost:5173', // Development environment
  'https://url-shortener-xi-woad.vercel.app', // Hardcoded Vercel URL for testing
  process.env.FRONTEND_URL // Production frontend URL from environment variable
]

console.log('Allowed CORS origins:', allowedOrigins);

// For debugging, allow all origins temporarily
app.use(cors({
  origin: true, // Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Log all incoming requests to help debug CORS issues
app.use((req, res, next) => {
  console.log(`Request from origin: ${req.headers.origin} to ${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/auth', auth)
app.use('/api/create', short_url)
app.use('/api/protected', protected_routes)

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
    console.log(`App URL: ${process.env.APP_URL || 'http://localhost:' + PORT}`);
});
