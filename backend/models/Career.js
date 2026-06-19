const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skills: {
      type: [String],
      required: true,
    },
    avgSalary: {
      type: String,
      required: true,
    },
    growthRate: {
      type: String,
      required: true,
    },
    demandLevel: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    icon: {
      type: String,
      default: 'code-2',
    },
    category: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model('Career', CareerSchema);
