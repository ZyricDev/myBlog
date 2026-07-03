import AppError from "../errors/AppError.js";

const validateId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];

  const isValidFormat = /^[a-zA-Z0-9-]+$/.test(id);
  if (!isValidFormat) {
    throw new AppError(`ID '${id}' is not in a valid format`, 400);
  }

  next();
};

export default validateId;
