import joi from "joi";

import { createBodyObjectSchema } from "../../shared/utils/validationHelpers.js";

const updateProfile = {
  body: createBodyObjectSchema({
    name: joi.string().trim().min(3).max(25).required().messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 25 characters.",
      "any.required": "Name is required.",
    }),

    job: joi.string().trim().min(4).max(40).required().messages({
      "string.base": "Job must be a string.",
      "string.empty": "Job is required.",
      "string.min": "Job must be at least 4 characters long.",
      "string.max": "Job must not exceed 40 characters.",
      "any.required": "Job is required.",
    }),

    bio: joi.string().trim().min(10).max(300).required().messages({
      "string.base": "Bio must be a string.",
      "string.empty": "Bio is required.",
      "string.min": "Bio must be at least 10 characters long.",
      "string.max": "Bio must not exceed 300 characters.",
      "any.required": "Bio is required.",
    }),
  }),
};

export default { updateProfile,  };
