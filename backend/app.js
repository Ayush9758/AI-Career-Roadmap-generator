const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorMiddleware');

// Load env vars
dotenv.config();

// Require Passport config (ensures it registers strategies)
require('./config/passport');

const app = express();

// Set security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allows browser fetching of local uploads
  })
);

// Enable CORS
app.use(
  cors({
    origin: '*', // For local dev compatibility, allow any frontend request
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // Production logging format custom stream to Winston logger
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.http(message.trim()),
      },
    })
  );
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Mount API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/assessments', require('./routes/assessmentRoutes'));
app.use('/api/recommendations', require('./routes/careerRoutes'));
app.use('/api/roadmaps', require('./routes/roadmapRoutes'));
app.use('/api/users', require('./routes/profileRoutes'));
app.use('/api/users', require('./routes/progressRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));

// 404 Route Not Found Handler
app.use((req, res, next) => {
  const err = new Error(`Route not found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
