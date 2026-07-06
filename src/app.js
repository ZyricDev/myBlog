import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import notFoundHandler from "./shared/middleware/notFound.js";
import globalErrorHandler from "./shared/errors/globalErrorHandler.js";
import fileManager from "./shared/utils/fileManager.js";

import authRoutes from "./modules/auth/auth.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import adminProfileRoutes from "./modules/profile/admin.profile.routes.js";
import projectRoutes from "./modules/project/project.routes.js";
import adminProjectRoutes from "./modules/project/admin.project.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(import.meta.dirname, "..", "uploads")),
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/admin/profile", adminProfileRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/admin/project", adminProjectRoutes);

//* 404 Handler
app.use(notFoundHandler);

//* Error Handler
app.use(globalErrorHandler);

export default app;
