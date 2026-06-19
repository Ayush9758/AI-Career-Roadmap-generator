const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware');

// Mount routes at /users/profile relative to parent router
router.route('/profile')
  .get(protect, profileController.getProfile)
  .put(protect, profileController.updateProfile);

module.exports = router;
