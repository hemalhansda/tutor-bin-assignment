const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {roleRights} = require("../config/roles");
const config = require("../config/config");
const userAcivities = require("../models/userActivities.model");

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;
  if (requiredRights.length) {
    if (req.user.role !== "admin") {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every(requiredRight => userRights.includes(requiredRight));
      if (!hasRequiredRights) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }

      if (user.verified === true) {
        await userAcivities.findOneAndUpdate({
          user: user
        }, {
          user: user,
          data: {
            method: req.method,
            url: req.originalUrl.split("?")[0],
            query: req.query,
            params: req.params,
            body: req.body
          }
        }, {upsert: true});
      }
    }
  }
  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  if (config.env === 'test') requiredRights = ['getSelf'];
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", {
      session: false
    }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  }).then(() => next()).catch(err => next(err));
};

module.exports = auth;