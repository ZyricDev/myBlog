import jwt from "jsonwebtoken";

import config from "../../config/env.js";

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    config.auth.accessTokenSecretKey,
    { expiresIn: config.auth.accessTokenExpiresIn + "m" },
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      tokenVersion: user.tokenVersion,
    },
    config.auth.refreshTokenSecretKey,
    { expiresIn: config.auth.refreshTokenExpiresIn + "d" },
  );

  return refreshToken;
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.auth.accessTokenSecretKey);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("TokenExpired", 401);
    }
    throw new AppError("InvalidToken", 401);
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.auth.refreshTokenSecretKey);
  } catch (err) {
    throw new AppError(
      "Invalid or expired refresh token. Please log in again.",
      401,
    );
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
