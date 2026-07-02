import profileRepository from "./profile.repository.js";
import AppError from "../../shared/errors/AppError.js";

const getProfile = async () => {
  const profile = await profileRepository.getProfile();

  if (!profile || Object.keys(profile).length === 0) {
    throw new AppError("Profile information not found in the system.", 404);
  }

  return profile;
};

const updateProfile = async (userData) => {
  return await profileRepository.updateProfile(userData);
};

export default { getProfile, updateProfile, };
