import rateLimit from "express-rate-limit";

// Rate limiting for the whole API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for voting to prevent spam
export const voteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit to 5 votes per minute
  message: { error: "Too many votes from this IP, please wait a minute." },
});
