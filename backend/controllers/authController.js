const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Controller for handling authentication requests
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

const googleCallback = async (req, res, next) => {
  try {
    const { credential } = req.body;
    const result = await authService.googleLogin(credential);
    return successResponse(res, 200, 'Google authentication successful', result);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    // req.user was populated by protect middleware
    return successResponse(res, 200, 'Current user retrieved successfully', req.user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // Auth is stateless using JWT, so frontend just discards the token.
    // We send success confirmation.
    return successResponse(res, 200, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  googleCallback,
  getCurrentUser,
  logout,
};
