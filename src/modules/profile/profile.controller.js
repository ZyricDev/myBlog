import AppError from "../../shared/errors/AppError.js";
import { sendSuccess } from "../../shared/utils/apiResponse.js";
import profileService from "./profile.service.js";

const getProfile = async (req, res) => {
  const profile = await profileService.getProfile();

  return sendSuccess(res, "", profile);
};

const updateProfile = async (req, res) => {
  const userData = req.body;

  const user = await profileService.updateProfile(userData);

  return sendSuccess(res, "Updated profile successfully", user)
};

export default {
  getProfile,
  updateProfile,
};
