import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import AppError from "../errors/AppError.js";
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
  const jti = uuidv4();

  const refreshToken = jwt.sign(
    {
      id: user.id,
      tokenVersion: user.tokenVersion,
      jti,
    },
    config.auth.refreshTokenSecretKey,
    { expiresIn: config.auth.refreshTokenExpiresIn + "d" },
  );

  return { refreshToken, jti };
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
