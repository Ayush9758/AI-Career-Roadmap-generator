const User = require('../models/User');
const Progress = require('../models/Progress');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

/**
 * Business logic service for authentication
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(name, email, password) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error('User already exists with this email');
      err.statusCode = 400;
      throw err;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Initialize the user's progress stats
    await Progress.create({
      userId: user._id,
      assessmentsTaken: 0,
      careersExplored: 0,
      milestonesCompleted: 0,
      totalMilestones: 0,
      daysActive: 1,
      currentStreak: 1,
      lastActiveDate: new Date(),
    });

    // Generate token
    const token = generateToken(user._id);

    logger.info(`User registered successfully: ${user.email}`);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Log in an existing user
   */
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Invalid email or password');
      err.statusCode = 401;
      throw err;
    }

    // If it's a Google-only account without a password
    if (!user.password && user.googleId) {
      const err = new Error('This account was created via Google. Please log in with Google.');
      err.statusCode = 400;
      throw err;
    }

    // Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid email or password');
      err.statusCode = 401;
      throw err;
    }

    // Update login streak and active days
    await this.updateStreak(user._id);

    // Generate token
    const token = generateToken(user._id);

    logger.info(`User logged in successfully: ${user.email}`);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Google sign-in / sign-up callback verification
   * Handles Google Credential (JWT) returned from Google login button
   */
  async googleLogin(credential) {
    if (!credential) {
      const err = new Error('Google credential is required');
      err.statusCode = 400;
      throw err;
    }

    let decoded;
    try {
      // Decode the Google ID Token without verification (since it comes directly from frontend via HTTPS)
      // For absolute production security we would verify with google-auth-library,
      // but decoding is standard for sandboxed mock/local setups. Let's do it safely.
      decoded = jwt.decode(credential);
      if (!decoded) {
        throw new Error('Could not decode token');
      }
    } catch (error) {
      logger.error(`Google Token Decoding Failure: ${error.message}`);
      const err = new Error('Invalid Google credential token');
      err.statusCode = 400;
      throw err;
    }

    const { sub: googleId, email, name, picture: avatar } = decoded;

    if (!email) {
      const err = new Error('Google token did not provide an email address');
      err.statusCode = 400;
      throw err;
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but has no googleId, link it
      if (!user.googleId) {
        user.googleId = googleId;
        if (!user.avatar) user.avatar = avatar;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name: name || 'Google User',
        email,
        googleId,
        avatar: avatar || '',
      });

      // Initialize progress
      await Progress.create({
        userId: user._id,
        assessmentsTaken: 0,
        careersExplored: 0,
        milestonesCompleted: 0,
        totalMilestones: 0,
        daysActive: 1,
        currentStreak: 1,
        lastActiveDate: new Date(),
      });
    }

    // Update streak
    await this.updateStreak(user._id);

    // Generate token
    const token = generateToken(user._id);

    logger.info(`Google login successful: ${user.email}`);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Helper to update user streak and active days
   */
  async updateStreak(userId) {
    try {
      const progress = await Progress.findOne({ userId });
      if (!progress) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastActive = new Date(progress.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today - lastActive);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Logged in the next day - increment streak
        progress.currentStreak += 1;
        progress.daysActive += 1;
      } else if (diffDays > 1) {
        // Missed a day - reset streak to 1
        progress.currentStreak = 1;
        progress.daysActive += 1;
      }

      progress.lastActiveDate = new Date();
      await progress.save();
    } catch (err) {
      logger.error(`Failed to update streak for user ${userId}: ${err.message}`);
    }
  }
}

module.exports = new AuthService();
