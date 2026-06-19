const careerService = require('../services/careerService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for career recommendation operations
 */
const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await careerService.getRecommendations(req.user.id);
    return successResponse(res, 200, 'Career recommendations retrieved successfully', recommendations);
  } catch (error) {
    next(error);
  }
};

const getRecommendationById = async (req, res, next) => {
  try {
    const career = await careerService.getRecommendationById(req.params.id);
    return successResponse(res, 200, 'Career recommendation retrieved successfully', career);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
  getRecommendationById,
};
