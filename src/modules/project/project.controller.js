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

  const project = await projectService.getProjectForAdmin(slug);

  return sendSuccess(res, "", { project });
};

const updateProject = async (req, res) => {
  const { slug } = req.params;
  const updateProjectData = req.body;

  const updatedProject = await projectService.updateProject(
    slug,
    updateProjectData,
  );

  return sendSuccess(res, "Updated profile successfully", {
    project: updatedProject,
  });
};

const deleteProject = async (req, res) => {
  const { slug } = req.params;

  await projectService.deleteProject(slug);

  return sendSuccess(res, "Deleted project successfully");
};

const toggleProjectStatus = async (req, res) => {
  const { slug } = req.params;

  const updatedStatus = await projectService.toggleProjectActiveStatus(slug);

  return sendSuccess(res, "Updated project status successfully", {
    isActive: updatedStatus,
  });
};

const removeProjectImage = async (req, res) => {
  const { slug, id: imageId } = req.params;

  const images = await projectService.removeProjectImage(slug, imageId);

  return sendSuccess(res, "Image removed from project successfully", {
    images,
  });
};

const addProjectImage = async (req, res) => {
  const { slug } = req.params;
  const projectImages = req.files;

  if (!projectImages || projectImages.length === 0) {
    throw new AppError("No images were uploaded.", 400);
  }

  const images = req.files.map((file) => ({
    id: file.filename.split(".")[0],
    url: `/${file.path}`,
  }));

  const newImages = await projectService.addProjectImage(slug, images);

  return sendSuccess(res, "Added project images successfully", {
    images: newImages,
  });
};

export default {
  getProjects,
  getProject,
  addProject,
  getProjectsForAdmin,
  getProjectForAdmin,
  updateProject,
  deleteProject,
  toggleProjectStatus,
  removeProjectImage,
  addProjectImage,
};
