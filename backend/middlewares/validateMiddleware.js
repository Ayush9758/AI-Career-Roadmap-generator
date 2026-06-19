const { errorResponse } = require('../utils/apiResponse');

/**
 * Express middleware to validate request bodies
 * @param {Function} validatorFunc - Function that validates data and returns { error, value }
 */
const validateBody = (validatorFunc) => {
  return (req, res, next) => {
    const { error, value } = validatorFunc(req.body);

    if (error) {
      return errorResponse(res, 400, 'Validation Error', error);
    }

    // Replace req.body with the sanitized/validated value
    req.body = value;
    next();
  };
};

module.exports = { validateBody };
