const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_career_roadmap';
  try {
    // Disable command buffering so queries fail fast when offline
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database Connection Error: ${error.message}`);
    logger.warn('The application server is running, but database features will be unavailable until a database connection is established.');
  }
};

module.exports = connectDB;
