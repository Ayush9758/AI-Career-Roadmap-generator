const roadmapService = require('../services/roadmapService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for career roadmap operations
 */
const generateRoadmap = async (req, res, next) => {
  try {
    const { careerId } = req.body;
    const roadmap = await roadmapService.generateRoadmap(req.user.id, careerId);
    return successResponse(res, 201, 'Roadmap generated successfully', roadmap);
  } catch (error) {
    next(error);
  }
};

const getRoadmap = async (req, res, next) => {
  try {
    const roadmap = await roadmapService.getRoadmap(req.params.id, req.user.id);
    return successResponse(res, 200, 'Roadmap retrieved successfully', roadmap);
  } catch (error) {
    next(error);
  }
};

const updateMilestone = async (req, res, next) => {
  try {
    const { roadmapId, milestoneId } = req.params;
    const { completed } = req.body;
    
    const result = await roadmapService.updateMilestone(
      req.user.id,
      roadmapId,
      milestoneId,
      completed
    );

    return successResponse(res, 200, 'Milestone updated successfully', result.roadmap);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateRoadmap,
  getRoadmap,
  updateMilestone,
};
