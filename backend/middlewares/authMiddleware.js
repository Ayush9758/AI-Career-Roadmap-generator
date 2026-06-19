const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * Protect routes - verify JWT token
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'super_secret_jwt_signing_key_change_me_in_production'
      );

      // Get user from the token, attach to request object
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return errorResponse(res, 401, 'Not authorized, user not found');
      }

      next();
    } catch (error) {
      logger.error(`Auth Middleware Error: ${error.message}`);
      return errorResponse(res, 401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized, no token provided');
  }
};

module.exports = { protect };
