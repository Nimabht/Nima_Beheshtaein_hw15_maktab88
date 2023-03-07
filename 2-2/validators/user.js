const Joi = require("joi");

module.exports = function validateUser(user) {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required().messages({
      "string.min": "First name must be at least 4 characters long",
      "any.required": "First name is required",
    }),
    lastname: Joi.string().min(4).required().messages({
      "string.min": "Last name must be at least 4 characters long",
      "any.required": "Last name is required",
    }),
    //FIXME: doesn't validate password
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .messages({
        "string.pattern.base":
          "Password is invalid (8 to 30 characters, containt : upper and lower characters and number) ",
      }),
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
    gender: Joi.string().required().messages({
      "any.required": "gender is required",
    }),
  });
  return schema.validate(user);
};
