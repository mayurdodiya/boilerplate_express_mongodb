const Joi = require("joi");

// common ObjectId validation with label
const objectId = (label = "id") =>
  Joi.string().trim().length(24).hex().label(label).messages({
    "string.base": "{#label} must be a string",
    "string.length": "{#label} must be 24 characters long",
    "string.hex": "{#label} must contain only hexadecimal characters",
  });

// login.
const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
};

// send OTP.
const sendOtp = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

// log out
const logout = {
  body: Joi.object().keys({
    fcmToken: Joi.string().optional().allow(""),
  }),
};

// verify OTP.
const verifyOtp = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    otp: Joi.string().trim().required(),
  }),
};

// change password.
const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().trim().required(),
    newPassword: Joi.string().trim().required(),
  }),
};

// forgot password.
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

module.exports = {
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  changePassword,
  logout
};
