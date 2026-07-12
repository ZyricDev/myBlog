import joi from "joi";

import { createBodyObjectSchema } from "../../shared/utils/validationHelpers.js";

const addProject = {
  body: createBodyObjectSchema({
    title: joi.string().trim().min(3).max(40).required().messages({
      "string.base": "Project title must be a string.",
      "string.empty": "Project title is required.",
      "string.min": "Project title must be at least 3 characters long.",
      "string.max": "Project title must not exceed 40 characters.",
      "any.required": "Project title is required.",
    }),

    role: joi.string().trim().min(2).max(40).required().messages({
      "string.base": "Role must be a string.",
      "string.empty": "Role is required.",
      "string.min": "Role must be at least 2 characters long.",
      "string.max": "Role must not exceed 40 characters.",
      "any.required": "Role is required.",
    }),

    description: joi.string().trim().min(10).max(150).required().messages({
      "string.base": "Description must be a string.",
      "string.empty": "Description is required.",
      "string.min": "Description must be at least 10 characters long.",
      "string.max": "Description must not exceed 150 characters.",
      "any.required": "Description is required.",
    }),

    highlights: joi
      .array()
      .items(
        joi.string().trim().min(5).max(100).messages({
          "string.base": "Each highlight must be a string.",
          "string.empty": "Highlight cannot be empty.",
          "string.min": "Highlight must be at least 5 characters long.",
          "string.max": "Highlight must not exceed 100 characters.",
        }),
      )
      .min(1)
      .max(3)
      .required()
      .messages({
        "array.base": "Highlights must be an array of strings.",
        "array.min": "At least one highlight is required.",
        "array.max": "You can add a maximum of 3 highlights.",
        "any.required": "Highlights are required.",
      }),

    techStack: joi
      .array()
      .items(
        joi.string().trim().min(2).max(20).messages({
          "string.base": "Each tech stack item must be a string.",
          "string.empty": "Tech stack item cannot be empty.",
          "string.min": "Tech stack item must be at least 2 characters long.",
          "string.max": "Tech stack item must not exceed 20 characters.",
        }),
      )
      .min(1)
      .max(6)
      .required()
      .messages({
        "array.base": "Tech stack must be an array of strings.",
        "array.min": "At least one technology is required in the tech stack.",
        "array.max": "You can add a maximum of 6 technologies.",
        "any.required": "Tech stack is required.",
      }),

    github: joi.string().trim().uri().max(255).allow(null, "").messages({
      "string.base": "GitHub link must be a string.",
      "string.empty": "GitHub link cannot be empty.",
      "string.uri": "GitHub link must be a valid URL.",
      "string.max": "GitHub link must not exceed 255 characters.",
    }),

    apiDocs: joi.string().trim().uri().max(255).allow(null, "").messages({
      "string.base": "API Docs link must be a string.",
      "string.empty": "API Docs link cannot be empty.",
      "string.uri": "API Docs link must be a valid URL.",
      "string.max": "API Docs link must not exceed 255 characters.",
    }),
  }),
};

export default { addProject };
