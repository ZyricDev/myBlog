import { sendSuccess } from "../../shared/utils/apiResponse.js";
import profileService from "./profile.service.js";

const getProfile = async (req, res) => {
  const profile = await profileService.getProfile();

  return sendSuccess(res, "", profile);
};

export default { getProfile };
