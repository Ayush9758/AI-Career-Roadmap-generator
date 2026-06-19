const Roadmap = require('../models/Roadmap');
const Career = require('../models/Career');
const Progress = require('../models/Progress');
const aiService = require('./aiService');
const logger = require('../utils/logger');

class RoadmapService {
  /**
   * Generates a learning roadmap for a specific career path.
   * Preserves progress if a roadmap already exists.
   */
  async generateRoadmap(userId, careerId) {
    // 1. Check if a roadmap already exists for this career to preserve progress
    const existingRoadmap = await Roadmap.findOne({ userId, careerId });
    if (existingRoadmap) {
      logger.info(`Roadmap already exists for career ${careerId}, returning existing.`);
      return existingRoadmap;
    }

    // 2. Fetch the corresponding career details
    // It can be a Mongo ObjectId or a string ID if using mocks. We check both.
    let career = await Career.findOne({ _id: careerId, userId });
    
    // If not found (e.g. mock recommendation that wasn't saved in DB but referenced)
    if (!career) {
      // Create a fallback career title
      career = {
        title: careerId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        skills: []
      };
      logger.warn(`Career ID ${careerId} not found in DB. Generating roadmap with fallback title: ${career.title}`);
    }

    // 3. Generate structured phases and milestones using AI service
    const generatedData = await aiService.generateRoadmap(career.title, career.skills);

    // Count total milestones in the newly generated roadmap
    let totalMilestonesCount = 0;
    generatedData.phases.forEach((phase) => {
      totalMilestonesCount += phase.milestones.length;
    });

    // 4. Save the roadmap to the database
    const roadmap = await Roadmap.create({
      userId,
      careerId,
      careerTitle: career.title,
      phases: generatedData.phases,
      overallProgress: 0,
    });

    // 5. Update user stats: update total milestones count
    const progress = await Progress.findOne({ userId });
    if (progress) {
      progress.totalMilestones += totalMilestonesCount;
      await progress.save();
    }

    logger.info(`Successfully generated and saved new roadmap for user ${userId}, career: ${career.title}`);
    return roadmap;
  }

  async getRoadmap(roadmapId, userId = null) {
    let roadmap;
    const mongoose = require('mongoose');

    if ((roadmapId === 'latest' || roadmapId === 'roadmap-1') && userId) {
      roadmap = await Roadmap.findOne({ userId }).sort({ updatedAt: -1 });
    } else if (mongoose.Types.ObjectId.isValid(roadmapId)) {
      roadmap = await Roadmap.findById(roadmapId);
    } else if (userId) {
      roadmap = await Roadmap.findOne({ userId }).sort({ updatedAt: -1 });
    }

    if (!roadmap) {
      const err = new Error('Roadmap not found');
      err.statusCode = 404;
      throw err;
    }
    return roadmap;
  }

  /**
   * Toggles a milestone completion state and updates all progress parameters
   */
  async updateMilestone(userId, roadmapId, milestoneId, completed) {
    let roadmap;
    const mongoose = require('mongoose');

    if (roadmapId === 'latest' || roadmapId === 'roadmap-1' || !mongoose.Types.ObjectId.isValid(roadmapId)) {
      roadmap = await Roadmap.findOne({ userId }).sort({ updatedAt: -1 });
    } else {
      roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
    }

    if (!roadmap) {
      const err = new Error('Roadmap not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    let milestoneFound = false;
    let totalMilestones = 0;
    let completedMilestones = 0;

    // Loop through phases and milestones to update progress
    roadmap.phases.forEach((phase) => {
      let phaseCompletedCount = 0;

      phase.milestones.forEach((milestone) => {
        // Find targeted milestone
        if (milestone.id === milestoneId) {
          milestone.completed = completed;
          milestone.completedAt = completed ? new Date() : null;
          milestoneFound = true;
          logger.info(`Updated milestone ${milestoneId} completed state to: ${completed}`);
        }

        if (milestone.completed) {
          phaseCompletedCount++;
          completedMilestones++;
        }
        totalMilestones++;
      });

      // Recalculate phase progress
      phase.progress = phase.milestones.length > 0
        ? Math.round((phaseCompletedCount / phase.milestones.length) * 100)
        : 0;
    });

    if (!milestoneFound) {
      const err = new Error('Milestone ID not found in roadmap');
      err.statusCode = 404;
      throw err;
    }

    // Recalculate overall progress
    roadmap.overallProgress = totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;

    await roadmap.save();

    // Update global dashboard statistics
    await this.syncUserProgressStats(userId);

    return { success: true, roadmap };
  }

  /**
   * Utility helper to sync user milestone counts in Progress model
   */
  async syncUserProgressStats(userId) {
    try {
      const userRoadmaps = await Roadmap.find({ userId });
      
      let totalMilestones = 0;
      let completedMilestones = 0;

      userRoadmaps.forEach((roadmap) => {
        roadmap.phases.forEach((phase) => {
          phase.milestones.forEach((milestone) => {
            totalMilestones++;
            if (milestone.completed) {
              completedMilestones++;
            }
          });
        });
      });

      const progress = await Progress.findOne({ userId });
      if (progress) {
        progress.milestonesCompleted = completedMilestones;
        progress.totalMilestones = totalMilestones;
        await progress.save();
      }
    } catch (err) {
      logger.error(`Failed to sync user progress statistics: ${err.message}`);
    }
  }
}

module.exports = new RoadmapService();
