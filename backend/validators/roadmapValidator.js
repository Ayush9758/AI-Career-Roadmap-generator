/**
 * Validator for roadmap requests
 */

const validateRoadmapGenerate = (data) => {
  const errors = {};
  const { careerId } = data || {};

  if (!careerId || typeof careerId !== 'string' || careerId.trim() === '') {
    errors.careerId = 'Career ID is required and must be a string';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    error: hasErrors ? errors : null,
    value: data,
  };
};

const validateMilestoneUpdate = (data) => {
  const errors = {};
  const { completed } = data || {};

  if (completed === undefined || typeof completed !== 'boolean') {
    errors.completed = 'Completed state is required and must be a boolean';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    error: hasErrors ? errors : null,
    value: data,
  };
};

module.exports = {
  validateRoadmapGenerate,
  validateMilestoneUpdate,
};
