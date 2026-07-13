import { Router } from "express";

import requireAuth from "../../shared/middleware/requireAuth.js";
import roleGuard from "../../shared/middleware/roleGuard.js";
import validateParams from "../../shared/middleware/validateParams.js";
import validate from "../../shared/middleware/validate.js";
import createUploader from "../../shared/utils/uploader.js";
import projectController from "./project.controller.js";
import projectValidation from "./project.validation.js";

const router = Router();

router.use(requireAuth);
router.use(roleGuard("admin"));

router
  .route("/")
  .post(
    createUploader("project", 5).array("images", 5),
    validate(projectValidation.addProject),
    projectController.addProject,
  )
  .get(projectController.getProjectsForAdmin);

router
  .route("/:slug")
  .get(validateParams("slug"), projectController.getProjectForAdmin)
  .put(
    validateParams("slug"),
    validate(projectValidation.addProject),
    projectController.updateProject,
  )
  .delete(validateParams("slug"), projectController.deleteProject);

router.patch(
  "/:slug/toggle-active",
  validateParams("slug"),
  projectController.toggleProjectStatus,
);

router.delete(
  "/:slug/image/:id",
  validateParams("slug"),
  validateParams("id"),
  projectController.removeProjectImage,
);

router.post(
  "/:slug/image",
  validateParams("slug"),
  createUploader("project", 5).array("images", 5),
  projectController.addProjectImage,
);

export default router;
