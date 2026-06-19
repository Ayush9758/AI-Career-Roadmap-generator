const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const { protect } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validateMiddleware');
const { validateRoadmapGenerate, validateMilestoneUpdate } = require('../validators/roadmapValidator');

// Mount routes relative to parent mount /roadmaps
router.post('/generate', protect, validateBody(validateRoadmapGenerate), roadmapController.generateRoadmap);
router.get('/:id', protect, roadmapController.getRoadmap);
router.patch('/:roadmapId/milestones/:milestoneId', protect, validateBody(validateMilestoneUpdate), roadmapController.updateMilestone);

module.exports = router;
