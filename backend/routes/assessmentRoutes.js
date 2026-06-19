const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { protect } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validateMiddleware');
const { validateAssessmentSubmit } = require('../validators/assessmentValidator');

// Get questions (can be public or protected; we align with frontend - it doesn't require token specifically, but we can make it public or protected. Let's make it public/accessible to logged-in users too)
router.get('/questions', assessmentController.getQuestions);

// Submit assessment (protected)
router.post('/submit', protect, validateBody(validateAssessmentSubmit), assessmentController.submitAssessment);

module.exports = router;
