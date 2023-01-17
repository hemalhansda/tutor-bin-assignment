const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {
  User
} = require("../models");
const { ObjectId } = require("bson");

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async id => {
  const userData = await User.findById(id);
  return userData;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async email => {
  return User.findOne({email, active: true});
};

const getUserByUsername = async username => {
  return User.findOne({username});
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const emailTaken = await User.isEmailTaken(userBody.email);
  const usernameTaken = await User.isUserNameTaken(userBody.username);

  if (usernameTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${userBody.username} already taken`);
  }

  if (emailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${userBody.email} already taken`);
  }

  const user = await User.create(userBody);

  return user;
};

module.exports = {
  getUserByUsername,
  createUser,
  getUserById,
  getUserByEmail,
};
