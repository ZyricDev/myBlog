import AppError from "../../shared/errors/AppError.js";
import projectRepository from "./project.repository.js";

const getProjects = async (filter) => {
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

export default {
  getProjects,
  getProject,
};
