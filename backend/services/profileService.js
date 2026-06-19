const User = require('../models/User');

class ProfileService {
  /**
   * Retrieves user profile
   */
  async getProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    return user;
  }

  /**
   * Updates user profile fields
   */
  async updateProfile(userId, updates) {
    const allowedUpdates = ['name', 'avatar'];
    const filteredUpdates = {};

    // Filter only allowed update parameters
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key) && updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    return user;
  }
}

module.exports = new ProfileService();
