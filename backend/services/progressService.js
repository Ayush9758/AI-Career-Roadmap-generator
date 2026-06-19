const Progress = require('../models/Progress');
const Career = require('../models/Career');
const logger = require('../utils/logger');

class ProgressService {
  /**
   * Retrieves dashboard stats for a user
   */
  async getDashboardStats(userId) {
    let progress = await Progress.findOne({ userId });

    // Initialize progress record if missing for some reason
    if (!progress) {
      progress = await Progress.create({
        userId,
        assessmentsTaken: 0,
        careersExplored: 0,
        milestonesCompleted: 0,
        totalMilestones: 0,
        daysActive: 1,
        currentStreak: 1,
        lastActiveDate: new Date(),
      });
    }

    // Fetch recommended careers to extract top match score
    const careers = await Career.find({ userId }).sort({ matchScore: -1 });
    const topMatchScore = careers.length > 0 ? careers[0].matchScore : 0;

    logger.info(`Fetched dashboard stats for user: ${userId}`);

    // Map to DashboardStats interface structure expected by frontend
    return {
      assessmentsTaken: progress.assessmentsTaken,
      careersExplored: progress.careersExplored,
      milestonesCompleted: progress.milestonesCompleted,
      totalMilestones: progress.totalMilestones,
      daysActive: progress.daysActive,
      currentStreak: progress.currentStreak,
      matchScore: topMatchScore,
    };
  }
}

module.exports = new ProgressService();
