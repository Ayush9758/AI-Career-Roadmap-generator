const progressService = require('../services/progressService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for progress dashboard stats
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await progressService.getDashboardStats(req.user.id);
    return successResponse(res, 200, 'Dashboard statistics retrieved successfully', stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
