import bcrypt from "bcrypt";

import authRepository from "./auth.repository.js";
import AppError from "../../shared/errors/AppError.js";
import jwt from "../../shared/utils/jwt.js";
import config from "../../config/env.js";

const register = async (userData) => {
  const emailExist = await authRepository.findUserByEmail(userData.email);

  if (emailExist) {
    throw new AppError("Email is already registered.", 409);
  }

  const newUserId = authRepository.generateNewId();

  const role = userData.email === config.admin.email ? "admin" : "user";
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const tokenVersion = 1;

  const tokenPayload = { id: newUserId, role, tokenVersion };

  const accessToken = jwt.generateAccessToken(tokenPayload);
  const refreshToken = jwt.generateRefreshToken(tokenPayload);

  const finalUserObj = {
    id: newUserId,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role,
    tokenVersion,
    refreshTokens: [refreshToken],
  };

  const newUser = await authRepository.createUser(finalUserObj);

  const { password, refreshTokens, tokenVersion: _, ...user } = newUser;

  return { user, accessToken, refreshToken };
};

export default { register };
