import AppError from "../errors/AppError";

const roleGuard = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      throw new AppError("You have not access to this route", 403);
    }

    next();
  };
};
