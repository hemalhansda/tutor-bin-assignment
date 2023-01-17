const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password)
  }),
};

const login = {
  body: Joi.object()
    .keys({
      email: Joi.string(),
      password: Joi.string(),
    })
    .min(1),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
    deviceToken: Joi.string(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
