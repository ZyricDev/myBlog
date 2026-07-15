import slugify from "slugify";

import AppError from "../../shared/errors/AppError.js";
import fileManager from "../../shared/utils/fileManager.js";
import projectRepository from "./project.repository.js";

const getProjects = async (filter = {}) => {
  const projects = await projectRepository.getProjects(filter);

  return projects;
};

const getProject = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);

  if (
    project?.isDelete === true ||
    !project ||
    Object.keys(project).length === 0
  ) {
    throw new AppError("Project not found", 404);
  }

  if (!project.isActive) {
    throw new AppError("This project is currently inactive.", 403);
  }

  return project;
};

const addProject = async (dataProject) => {
  const slug = slugify(dataProject.title, {
    lower: true,
    strict: true,
    remove: /[^a-zA-Z0-9\s-]/g,
  });

  const slugExist = await projectRepository.getProjectBySlug(slug);
  if (slugExist) {
    throw new AppError("A project with this title already exists.", 409);
  }

  const newProject = await projectRepository.createProject({
    slug,
    isActive: true,
    isDelete: false,
    ...dataProject,
  });

  return newProject;
};

const getProjectForAdmin = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);

  if (
    project?.isDelete === true ||
    !project ||
    Object.keys(project).length === 0
  ) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

const updateProject = async (slug, updateProjectData) => {
  const project = await projectRepository.getProjectBySlug(slug);

  if (
    project?.isDelete === true ||
    !project ||
    Object.keys(project).length === 0
  ) {
    throw new AppError("Project not found", 404);
  }

  const updatedProject = await projectRepository.updateProjectBySlug(
    slug,
    updateProjectData,
  );

  return updatedProject;
};

const deleteProject = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);
  if (project?.isDelete || !project) {
    throw new AppError("Project not found", 404);
  }

  await projectRepository.softDeleteProjectBySlug(slug);

  return;
};

const toggleProjectActiveStatus = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);
  if (project?.isDelete === true || !project) {
    throw new AppError("Project not found", 404);
  }

  await projectRepository.updateProjectStatus(slug, !project.isActive);

  return !project.isActive;
};

const removeProjectImage = async (slug, imageId) => {
  const project = await projectRepository.getProjectBySlug(slug);
  if (project?.isDelete === true || !project) {
    throw new AppError("Project not found", 404);
  }

  const image = project.images.find(
    (image) => String(image.id) === String(imageId),
  );

  if (!image) {
    throw new AppError("Image not found", 404);
  }
  const newArrayImages = project.images.filter(
    (image) => String(image.id) !== String(imageId),
  );

  await projectRepository.updateProjectImages(slug, newArrayImages);

  await fileManager.deleteFile(image.url);

  return newArrayImages;
};

const addProjectImage = async (slug, newImages) => {
  const project = await projectRepository.getProjectBySlug(slug);
  if (project?.isDelete === true || !project) {
    throw new AppError("Project not found", 404);
  }

  const currentImages = project.images || [];

  if (currentImages.length + newImages.length > 5) {
    throw new AppError("A project can have a maximum of 5 images", 400);
  }

  const updatedImages = [...currentImages, ...newImages];

  return await projectRepository.updateProjectImages(slug, updatedImages);
};

export default {
  getProjects,
  getProject,
  addProject,
  getProjectForAdmin,
  updateProject,
  deleteProject,
  toggleProjectActiveStatus,
  removeProjectImage,
  addProjectImage,
};
