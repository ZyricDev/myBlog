import profileRepository from "./profile.repository.js";
import AppError from "../../shared/errors/AppError.js";

const getProfile = async () => {
  const profile = await profileRepository.getProfile();

  if (!profile || Object.keys(profile).length === 0) {
    throw new AppError("Profile information not found in the system.", 404);
  }

  return profile;
};

const updateProfile = async (profileData) => {
  return await profileRepository.updateProfile(profileData);
};

const addSkill = async (skillData) => {
  const { name, category, startedAt, iconPath } = skillData;

  const skill = {
    id: profileRepository.generateNewId(),
    name,
    category,
    startedAt,
    iconPath,
  };

  const newSkill = await profileRepository.addSkill(skill);

  return newSkill;
};

const deleteSkill = async (idSkill) => {
  const isDeletedSkill = await profileRepository.deleteSkill(idSkill);

  if (!isDeletedSkill ) {
    throw new AppError("Skill not found", 404);
  }

  return;
};

export default {
  getProfile,
  updateProfile,
  addSkill,
  deleteSkill,
};
