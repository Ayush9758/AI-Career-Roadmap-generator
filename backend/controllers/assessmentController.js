const assessmentService = require('../services/assessmentService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for assessment operations
 */
const getQuestions = async (req, res, next) => {
  try {
    const questions = await assessmentService.getQuestions();
    return successResponse(res, 200, 'Questions retrieved successfully', questions);
  } catch (error) {
    next(error);
  }
};

const submitAssessment = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const result = await assessmentService.submitAssessment(req.user.id, answers);
    return successResponse(res, 200, result.message, result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  submitAssessment,
};
