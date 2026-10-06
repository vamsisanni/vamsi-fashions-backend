const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // 15 min lo max 100 requests per IP
  standardHeaders: true,    // RateLimit-* headers pampistundi
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests, please try again after 15 minutes'
  }
});

module.exports = rateLimiter;