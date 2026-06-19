const Career = require('../models/Career');

class CareerService {
  /**
   * Gets all career recommendations for a user
   */
  async getRecommendations(userId) {
    return Career.find({ userId }).sort({ matchScore: -1 });
  }

  /**
   * Gets a specific career recommendation details
   */
  async getRecommendationById(id) {
    const career = await Career.findById(id);
    if (!career) {
      const err = new Error('Career recommendation not found');
      err.statusCode = 404;
      throw err;
    }
    return career;
  }
}

module.exports = new CareerService();
