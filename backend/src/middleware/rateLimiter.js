import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || "20", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please wait 15 minutes before trying again.",
  },
  handler: (req, res, next, options) => {
    console.warn(`[rate-limit] blocked ${req.ip}`);
    res.status(429).json(options.message);
  },
});

