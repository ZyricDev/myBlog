import { Router } from "express";

import profileController from "./profile.controller.js";

const router = Router();

router.route("/").get(profileController.getProfile);

export default router;
