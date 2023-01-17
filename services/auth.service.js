const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { User, Token, FCMToken } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginUserWithEmailAndPassword = async (email, password) => {
  // verfiy otp if email is not included -during production.
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */

const logout = async (data) => {
  if(data.refreshToken) {
    const result = await Token.findOne({ token: data.refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
    }

    if(data.deviceToken) {
      const deviceTokens = await FCMToken.findOne({user: result.user});
      if(deviceTokens && deviceTokens.token) {
        if(!Array.isArray(deviceTokens.token)) {
          deviceTokens.token = [];
        } else {
          deviceTokens.token = deviceTokens.token.filter(x => x !== data.deviceToken);
        }
      }
      deviceTokens.save();
    }

    await result.remove();
  }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth
};
