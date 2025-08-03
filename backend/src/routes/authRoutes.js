import express from 'express';
import { register, login } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs for auth routes
  message: 'Too many authentication attempts, please try again later.',
});

// Apply rate limiting to auth routes
router.use(authLimiter);

// Auth routes
router.post('/register', register);
router.post('/login', login);

export default router;