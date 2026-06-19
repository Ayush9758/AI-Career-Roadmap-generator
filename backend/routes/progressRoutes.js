const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

// Mount routes at /users/stats relative to parent router mount
router.get('/stats', protect, progressController.getDashboardStats);

module.exports = router;
