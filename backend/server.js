const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION! Shutting down... ${err.name}: ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});

// Connect database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION! Shutting down... ${err.name}: ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
