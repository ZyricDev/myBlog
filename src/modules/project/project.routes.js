import { Router } from "express";

import projectController from "./project.controller.js";

const router = Router();

router.get("/", projectController.getProjects);

export default router;
