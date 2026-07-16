import rateLimit from "express-rate-limit";
import AppError from "../errors/AppError.js";

const createRateLimiter = (windowMinutes, max) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res, next) => {
      throw new AppError("Too many requests, please try again later", 429);
    },
  });
};

export default createRateLimiter;
