import express from 'express';
const router = express.Router();
import { createShortUrl } from '../controllers/short_url.controller.js';

router.post('/', createShortUrl);

export default router;