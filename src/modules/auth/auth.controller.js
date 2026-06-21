import { sendSuccess } from "../../shared/utils/apiResponse.js";
import cookie from "../../shared/utils/cookie.js";
import authService from "./auth.service.js";

const register = async (req, res) => {
  const userData = req.body;

  const { user, accessToken, refreshToken } =
    await authService.register(userData);

  cookie.setTokenCookie(res, "accessToken", accessToken);
  cookie.setTokenCookie(res, "refreshToken", refreshToken);

  return sendSuccess(
    res,
    "User registered successfully.",
    {
      user,
    },
    201,
  );
};

export default { register };
