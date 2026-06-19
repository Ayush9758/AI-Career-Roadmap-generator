const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const Upload = require('../models/Upload');

// Check if Cloudinary is configured
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name';

class UploadService {
  /**
   * Uploads a file (image, resume, etc.)
   */
  async uploadFile(userId, file, fileType) {
    if (!file) {
      const err = new Error('No file provided');
      err.statusCode = 400;
      throw err;
    }

    let fileUrl = '';
    let publicId = '';

    if (isCloudinaryConfigured) {
      try {
        // Upload to Cloudinary
        logger.info(`Uploading file ${file.originalname} to Cloudinary...`);
        const folder = fileType === 'avatar' ? 'avatars' : 'resumes';
        const result = await cloudinary.uploader.upload(file.path, {
          folder: `ai_career_roadmap/${folder}`,
          resource_type: 'auto',
        });

        fileUrl = result.secure_url;
        publicId = result.public_id;

        // Delete temporary local file
        fs.unlinkSync(file.path);
      } catch (error) {
        logger.error(`Cloudinary Upload Error: ${error.message}. Falling back to local storage.`);
        // Fallback to local url if Cloudinary fails
        const localDetails = this.saveLocalFile(file);
        fileUrl = localDetails.fileUrl;
        publicId = localDetails.publicId;
      }
    } else {
      // Local storage fallback
      const localDetails = this.saveLocalFile(file);
      fileUrl = localDetails.fileUrl;
      publicId = localDetails.publicId;
    }

    // Save metadata record in database
    const uploadRecord = await Upload.create({
      userId,
      fileName: file.originalname,
      fileUrl,
      fileType,
      publicId,
    });

    return uploadRecord;
  }

  /**
   * Helper to structure local url details
   */
  saveLocalFile(file) {
    // Determine target static folder
    const relativePath = `/uploads/temp/${file.filename}`;
    
    // We keep the file in uploads/temp/ (multer already placed it there)
    return {
      fileUrl: `http://localhost:${process.env.PORT || 5000}${relativePath}`,
      publicId: `local-${file.filename}`,
    };
  }

  /**
   * Deletes a file from storage
   */
  async deleteFile(uploadId) {
    const uploadRecord = await Upload.findById(uploadId);
    if (!uploadRecord) {
      const err = new Error('Upload record not found');
      err.statusCode = 404;
      throw err;
    }

    const { publicId, fileUrl } = uploadRecord;

    if (publicId.startsWith('local-')) {
      // Delete local file
      const filename = publicId.replace('local-', '');
      const filePath = path.join(__dirname, '../uploads/temp', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        logger.info(`Deleted local file: ${filePath}`);
      }
    } else if (isCloudinaryConfigured) {
      // Delete from Cloudinary
      try {
        logger.info(`Deleting public ID ${publicId} from Cloudinary...`);
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        logger.error(`Cloudinary Delete Error: ${error.message}`);
      }
    }

    await uploadRecord.deleteOne();
    return { success: true };
  }
}

module.exports = new UploadService();
