const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const mobile = (value, helpers) => {
  if (value.length < 10) {
    return helpers.message('Invalid mobile number');
  }
};

const password = (value, helpers) => {
  // change it during production.
  if (value.length < 3) {
    return helpers.message('password must be at least 3 characters');
  }

  // if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
  //   return helpers.message('password must contain at least 1 letter and 1 number');
  // }
  return value;
};

module.exports = {
  mobile,
  objectId,
  password,
};
