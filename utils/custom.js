const _ = require('lodash');

const parseResponse = (obj) => {
  _.forIn(obj, (val, key) => {
    if (Array.isArray(val)) {
      _.forEach(val, (inVal, inKey) => {
        inVal = parseResponse(inVal);
      });
    } else if (val === null) {
      obj[key] = '';
    }
  });
  return obj;
};

module.exports = { parseResponse };
