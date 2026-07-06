import { Router } from "express";

import requireAuth from "../../shared/middleware/requireAuth.js";
import roleGuard from "../../shared/middleware/roleGuard.js";
import projectController from "./project.controller.js";

const router = Router();

router.use(requireAuth);
router.use(roleGuard("admin"));

router.route("/").get(projectController.getProjectsForAdmin);

export default router;
