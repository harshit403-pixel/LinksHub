import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again in 15 minutes.",
  },
});


export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 15,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "AI request limit reached. Please wait a minute.",
  },
});

export const importLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many imports. Please wait before importing another repository.",
  },
});