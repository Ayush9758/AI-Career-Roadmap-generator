/**
 * Validator for assessment submissions
 */

const validateAssessmentSubmit = (data) => {
  const errors = {};
  const { answers } = data || {};

  if (!answers || !Array.isArray(answers)) {
    errors.answers = 'Answers must be an array';
  } else if (answers.length === 0) {
    errors.answers = 'Answers array cannot be empty';
  } else {
    // Validate each answer item
    answers.forEach((item, index) => {
      if (!item.questionId || typeof item.questionId !== 'string') {
        errors[`answers[${index}].questionId`] = 'Question ID is required and must be a string';
      }
      if (item.answer === undefined || item.answer === null) {
        errors[`answers[${index}].answer`] = 'Answer value is required';
      }
    });
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    error: hasErrors ? errors : null,
    value: data,
  };
};

module.exports = {
  validateAssessmentSubmit,
};
