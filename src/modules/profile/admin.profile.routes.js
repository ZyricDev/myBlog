import { Router } from "express";

import requireAuth from "../../shared/middleware/requireAuth.js";
import roleGuard from "../../shared/middleware/roleGuard.js";
import profileController from "./profile.controller.js";

const router = Router();

router
  .route("/")
  .get(requireAuth, roleGuard("admin"), profileController.getProfile);

export default router;
