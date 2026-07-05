import projectRepository from "./project.repository.js";

const getProjects = async (filter) => {
  const projects = await projectRepository.getProjects(filter);

  return projects;
};

export default { getProjects };
