import { Router } from "express";

import requireAuth from "../../shared/middleware/requireAuth.js";
import roleGuard from "../../shared/middleware/roleGuard.js";
import validate from "../../shared/middleware/validate.js";
import profileController from "./profile.controller.js";
import profileValidation from "./profile.validation.js";

const router = Router();

 router.use(requireAuth);
 router.use(roleGuard("admin"));

router
  .route("/")
  .get(profileController.getProfile)
  .put(
    validate(profileValidation.updateProfile),
    profileController.updateProfile,
  );

export default router;
