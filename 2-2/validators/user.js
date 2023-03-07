const Joi = require("joi");

module.exports = function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(30)
      .required()
      .messages({
        "string.base": "Username must be a string",
        "string.alphanum":
          "Username must only contain alpha-numeric characters",
        "string.min": "Username must be at least 4 characters long",
        "string.max": "Username cannot be longer than 30 characters",
        "any.required": "Username is required",
      }),
    password: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .messages({
        "string.pattern.base":
          "Password is invalid (8 to 30 characters, containt : upper and lower characters and number) ",
        "any.required": "Password is required",
      }),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .messages({
        "string.base": "Email should be a string",
        "any.required": "Email is required",
        "string.minDomainSegments":
          "Email should have at least two domain segments",
        "string.tlds":
          "Email should have a valid top-level domain (com,net)",
      }),
    gender: Joi.string().messages({
      "string.base": "gender must be a string",
    }),
  });
  return schema.validate(user);
};
