const cloudinary = require('cloudinary').v2;
const logger = require('../utils/logger');

// Check if credentials are set
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name';

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  logger.info('Cloudinary SDK configured');
} else {
  logger.warn('Cloudinary environment variables missing. Storage will fall back to local disk.');
}

module.exports = cloudinary;
