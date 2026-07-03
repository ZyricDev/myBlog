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
    startedA,
    iconPath,
  };

  const newSkill = await profileRepository.addSkill(skill);

  return newSkill;
};

export default {
  getProfile,
  updateProfile,
  addSkill,
};
