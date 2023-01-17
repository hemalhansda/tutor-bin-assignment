const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const autoPopulate = require("mongoose-autopopulate");
const {toJSON, paginate} = require("./plugins");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null,
    trim: true
  },
  password: {
    type: String,
    default: "",
    trim: true,
    private: true // used by the toJSON plugin
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(autoPopulate);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: {
      $ne: excludeUserId
    }
  });
  return !!user;
};

userSchema.statics.isUserNameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({
    username,
    _id: {
      $ne: excludeUserId
    }
  });
  return !!user;
};

userSchema.statics.isMobileTaken = async function (mobile, excludeUserId) {
  const user = await this.findOne({
    mobile,
    _id: {
      $ne: excludeUserId
    }
  });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 3);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
