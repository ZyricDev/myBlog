import { Router } from "express";

import validateParams from "../../shared/middleware/validateParams.js";
import projectController from "./project.controller.js";

const router = Router();

router.get("/", projectController.getProjects);

router.get("/:slug", validateParams("slug"), projectController.getProject);

export default router;
