const mongoose = require('mongoose');

const AssessmentAnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { _id: false });

const AssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: {
      type: [AssessmentAnswerSchema],
      required: true,
      validate: [
        (val) => val.length > 0,
        'Assessment must contain at least one answer',
      ],
    },
    completedAt: {
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

module.exports = mongoose.model('Assessment', AssessmentSchema);
