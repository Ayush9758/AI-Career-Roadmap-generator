const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const { protect } = require('../middlewares/authMiddleware');

// Mount routes at /recommendations relative to parent router
router.get('/', protect, careerController.getRecommendations);
router.get('/:id', protect, careerController.getRecommendationById);

module.exports = router;
