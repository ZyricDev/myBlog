import rateLimit from "express-rate-limit";
import AppError from "../errors/AppError.js";

const createRateLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
      throw new AppError("Too many requests, please try again later", 429);
    },
  });
};

export default createRateLimiter;
