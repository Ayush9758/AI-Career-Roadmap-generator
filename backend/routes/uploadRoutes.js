const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Mount routes at /api/uploads
router.post('/avatar', protect, upload.single('avatar'), uploadController.uploadAvatar);
router.post('/resume', protect, upload.single('resume'), uploadController.uploadResume);

module.exports = router;
