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
  'http://localhost:5173',
  process.env.FRONTEND_URL || 'https://url-shortener-ratanz.vercel.app'
];

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked for origin:', origin);
      return callback(null, false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

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
