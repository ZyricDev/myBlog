import { Router } from "express";

import validate from "../../shared/middleware/validate.js";
import createRateLimiter from "../../shared/middleware/rateLimiter.js";
import authController from "./auth.controller.js";
import authValidation from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  createRateLimiter(15, 5),
  validate(authValidation.register),
  authController.register,
);

router.post(
  "/login",
  createRateLimiter(15, 5),
  validate(authValidation.login),
  authController.login,
);

router.delete("/logout", authController.logout);

router.post("/refresh", authController.refreshToken);

export default router;
