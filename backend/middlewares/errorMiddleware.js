const logger = require('../utils/logger');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  const statusCode = err.statusCode || 500;

  // Log the error. For expected client errors (4xx), log at warning level without stack trace.
  // For server errors (5xx) or unhandled errors, log at error level with stack trace.
  if (statusCode >= 500) {
    logger.error(`${err.name || 'Error'}: ${err.message}\nStack: ${err.stack}`);
  } else {
    logger.warn(`${err.name || 'Error'}: ${err.message} (${statusCode})`);
  }

  // Mongoose connection or buffering errors (like IP whitelist blocks)
  if (
    (err.name === 'MongooseError' && err.message.includes('buffering timed out')) ||
    err.name === 'MongoServerSelectionError' ||
    err.name === 'MongoNetworkError' ||
    err.message.includes('topology') ||
    err.message.includes('connection closed') ||
    err.message.includes('buffering timed out')
  ) {
    const message = 'Database connection is offline. If you are using MongoDB Atlas, please check that your current IP address is whitelisted in your Atlas Network Access settings (allow access from anywhere 0.0.0.0/0 for testing).';
    return errorResponse(res, 503, message);
  }

  // Mongoose bad ObjectId format
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    return errorResponse(res, 404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return errorResponse(res, 400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    return errorResponse(res, 400, message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid authentication token');
  }
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Authentication token expired');
  }

  // Default error response
  const message = err.message || 'Internal Server Error';

  return errorResponse(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};

module.exports = errorHandler;
