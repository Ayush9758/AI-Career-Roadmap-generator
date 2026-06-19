/**
 * Standardized API Response Helper
 */

/**
 * Sends a successful API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - User-friendly message
 * @param {Object|Array} [data=null] - Payload data
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends an error API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object|Array|string} [errors=null] - Detailed validation or system errors
 */
const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const responsePayload = {
    success: false,
    message,
  };

  if (errors) {
    responsePayload.errors = errors;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  successResponse,
  errorResponse,
};
