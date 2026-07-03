import AppError from "../../shared/errors/AppError.js";
import { sendSuccess } from "../../shared/utils/apiResponse.js";
import profileService from "./profile.service.js";

const getProfile = async (req, res) => {
  const profile = await profileService.getProfile();

  return sendSuccess(res, "", { profile });
};

const updateProfile = async (req, res) => {
  const profileData = req.body;

  const profile = await profileService.updateProfile(profileData);

  return sendSuccess(res, "Updated profile successfully", { profile });
};

const addSkill = async (req, res) => {
  const iconPath = req.file?.path;
  if (!iconPath) {
    throw new AppError("Skill icon is required.", 400);
  }

  const skillData = {
    ...req.body,
    iconPath,
  };

  const newSkill = await profileService.addSkill(skillData);

  return sendSuccess(res, "Added skill successfully", { skill: newSkill }, 201);
};

export default {
  getProfile,
  updateProfile,
  addSkill,
};
