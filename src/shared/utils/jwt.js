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

export default {
  generateAccessToken,
  generateRefreshToken,
};
