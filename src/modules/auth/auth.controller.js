import AppError from "../../shared/errors/AppError.js";
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

const login = async (req, res) => {
  const userData = req.body;

  const { user, accessToken, refreshToken } = await authService.login(userData);

  cookie.setTokenCookie(res, "accessToken", accessToken);
  cookie.setTokenCookie(res, "refreshToken", refreshToken);

  return sendSuccess(res, "Login successfully", { user });
};

const logout = async (req, res) => {
  const refreshToken = cookie.getTokenCookie(req, "refreshToken");

  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

  return sendSuccess(res, "Successfully logged out.");
};

const refreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = cookie.getTokenCookie(req, "refreshToken");
    if (!oldRefreshToken) {
      throw new AppError("No refresh token provided.", 401);
    }

    const { accessToken, refreshToken } =
      await authService.refreshToken(oldRefreshToken);

    cookie.setTokenCookie(res, "accessToken", accessToken);
    cookie.setTokenCookie(res, "refreshToken", refreshToken);

    return sendSuccess(res, "Tokens refreshed successfully");
  } catch (err) {
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

    next(err);
  }
};

export default {
  register,
  login,
  logout,
  refreshToken,
};
