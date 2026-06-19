const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    assessmentsTaken: {
      type: Number,
      default: 0,
    },
    careersExplored: {
      type: Number,
      default: 0,
    },
    milestonesCompleted: {
      type: Number,
      default: 0,
    },
    totalMilestones: {
      type: Number,
      default: 0,
    },
    daysActive: {
      type: Number,
      default: 1,
    },
    currentStreak: {
      type: Number,
      default: 1,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Progress', ProgressSchema);
