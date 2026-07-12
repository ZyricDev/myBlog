import AppError from "../../shared/errors/AppError.js";
import { sendSuccess } from "../../shared/utils/apiResponse.js";
import projectService from "./project.service.js";

const getProjects = async (req, res) => {
  const projects = await projectService.getProjects({ isActive: true });

  return sendSuccess(res, "", { projects });
};

const getProject = async (req, res) => {
  const { slug } = req.params;

  const project = await projectService.getProject(slug);

  return sendSuccess(res, "", { project });
};

const addProject = async (req, res) => {
  const projectImages = req.files;
  if (!projectImages || projectImages.length === 0) {
    throw new AppError("No images were uploaded.", 400);
  }

  const images = req.files.map((file) => ({
    id: file.filename.split(".")[0],
    url: `/${file.path}`,
  }));

  const dataProject = {
    ...req.body,
    images,
  };

  const project = await projectService.addProject(dataProject);

  return sendSuccess(res, "Added project successfully", { project }, 201);
};

const getProjectsForAdmin = async (req, res) => {
  const projects = await projectService.getProjects();

  return sendSuccess(res, "", { projects });
};

const getProjectForAdmin = async (req, res) => {
  const { slug } = req.params;

  const project = await projectService.getProjectForAdmin();

  return sendSuccess(res, "", { project });
};

const deleteProject = async (req, res) => {
  const { slug } = req.params;

  await projectService.deleteProject(slug);

  return sendSuccess(res, "Deleted project successfully");
};

export default {
  getProjects,
  getProject,
  addProject,
  getProjectsForAdmin,
  getProjectForAdmin,
  deleteProject,
};
