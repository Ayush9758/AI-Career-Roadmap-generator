const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validateBody } = require('../middlewares/validateMiddleware');
const { validateRegister, validateLogin } = require('../validators/authValidator');

// Public auth endpoints
router.post('/register', validateBody(validateRegister), authController.register);
router.post('/login', validateBody(validateLogin), authController.login);
router.post('/google', authController.googleCallback);
router.post('/logout', authController.logout);

// Protected auth endpoints
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
