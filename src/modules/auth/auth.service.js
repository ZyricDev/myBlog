import bcrypt from "bcrypt";

import authRepository from "./auth.repository.js";
import AppError from "../../shared/errors/AppError.js";
import jwt from "../../shared/utils/jwt.js";
import config from "../../config/env.js";

const _generateAuthTokens = (userObj) => {
  const tokenPayload = {
    id: userObj.id,
    role: userObj.role,
    tokenVersion: userObj.tokenVersion,
  };

  const accessToken = jwt.generateAccessToken(tokenPayload);
  const { refreshToken, jti } = jwt.generateRefreshToken(tokenPayload);

  return { accessToken, refreshToken, jti };
};

const _getPublicProfile = (userObj) => {
  return {
    id: userObj.id,
    name: userObj.name,
    email: userObj.email,
    role: userObj.role,
  };
};

const register = async (userData) => {
  const emailExist = await authRepository.findUserByEmail(userData.email);

  if (emailExist) {
    throw new AppError("Email is already registered.", 409);
  }

  const newUserId = authRepository.generateNewId();

  const role = userData.email === config.admin.email ? "admin" : "user";
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const tokenVersion = 1;

  const { accessToken, refreshToken, jti } = _generateAuthTokens({
    id: newUserId,
    role,
    tokenVersion,
  });

  const finalUserObj = {
    id: newUserId,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role,
    tokenVersion,
    isBanned: false,
    activeSessions: [jti],
  };

  const newUser = await authRepository.createUser(finalUserObj);

  return { user: _getPublicProfile(newUser), accessToken, refreshToken };
};

const login = async (userData) => {
  const { email, password } = userData;

  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.isBanned) {
    throw new AppError("Your account has been suspended.", 403);
  }

  const { accessToken, refreshToken, jti } = _generateAuthTokens(user);

  await authRepository.addSession(user.id, jti);

  return { user: _getPublicProfile(user), refreshToken, accessToken };
};

const logout = async (refreshToken) => {
  try {
    const payload = jwt.verifyRefreshToken(refreshToken);

    await authRepository.removeSession(payload.id, payload.jti);

    return;
  } catch (err) {
    return;
  }
};

export default { register, login, logout };
