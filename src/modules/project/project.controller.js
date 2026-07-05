import { sendSuccess } from "../../shared/utils/apiResponse.js";
import projectService from "./project.service.js";

const getProjects = async (req, res) => {
  const projects = await projectService.getProjects({ isActive: true });

  return sendSuccess(res, "", { projects });
};

export default { getProjects };
