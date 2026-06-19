const profileService = require('../services/profileService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for user profile operations
 */
const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    return successResponse(res, 200, 'Profile retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await profileService.updateProfile(req.user.id, req.body);
    return successResponse(res, 200, 'Profile updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
