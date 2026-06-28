import AppError from "../errors/AppError.js";
import cookie from "../utils/cookie.js";
import jwt from "../utils/jwt.js";

const requireAuth = (req, res, next) => {
  const accessToken = cookie.getTokenCookie(req, "accessToken");
  if (!accessToken) {
    throw new AppError(
      "You are not logged in. Please log in to get access.",
      401,
    );
  }

  const decoded = jwt.verifyAccessToken(accessToken);

  req.user = decoded;

  next();
};

export default requireAuth;
