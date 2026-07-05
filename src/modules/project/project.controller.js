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

export default {
  getProjects,
  getProject,
};
