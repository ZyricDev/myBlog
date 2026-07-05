import { Router } from "express";

import requireAuth from "../../shared/middleware/requireAuth.js";
import roleGuard from "../../shared/middleware/roleGuard.js";
import validate from "../../shared/middleware/validate.js";
import validateParams from "../../shared/middleware/validateParams.js";
import profileController from "./profile.controller.js";
import profileValidation from "./profile.validation.js";
import createUploader from "../../shared/utils/uploader.js";

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

router.post(
  "/skill",
  createUploader("/icons", 1).single("icon"),
  validate(profileValidation.skill),
  profileController.addSkill,
);

router.delete(
  "/skill/:id",
  validateParams("id"),
  profileController.deleteSkill,
);

export default router;
