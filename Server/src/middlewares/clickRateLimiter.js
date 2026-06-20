import rateLimit from 'express-rate-limit';

export const clickRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,

  message: {
    message: 'Too many clicks from this IP. Please try again later.',
  },

  standardHeaders: true,
  legacyHeaders: false,
});