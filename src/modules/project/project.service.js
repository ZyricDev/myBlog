import slugify from "slugify";

import AppError from "../../shared/errors/AppError.js";
import projectRepository from "./project.repository.js";

const getProjects = async (filter = {}) => {
  const projects = await projectRepository.getProjects(filter);

  return projects;
};

const getProject = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);

  if (!project || Object.keys(project).length === 0) {
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
    ...dataProject,
  });

  return newProject;
};

const getProjectForAdmin = async (slug) => {
  const project = await projectRepository.getProjectBySlug(slug);

  if (!project || Object.keys(project).length === 0) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

export default {
  getProjects,
  getProject,
  addProject,
  getProjectForAdmin,
};
