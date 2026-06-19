const uploadService = require('../services/uploadService');
const profileService = require('../services/profileService');
const { successResponse } = require('../utils/apiResponse');

/**
 * Controller for file uploading operations
 */
const uploadAvatar = async (req, res, next) => {
  try {
    const uploadResult = await uploadService.uploadFile(req.user.id, req.file, 'avatar');
    
    // Update the user's avatar URL in user profile
    const updatedUser = await profileService.updateProfile(req.user.id, {
      avatar: uploadResult.fileUrl,
    });

    return successResponse(res, 200, 'Avatar uploaded and updated successfully', {
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    const uploadResult = await uploadService.uploadFile(req.user.id, req.file, 'resume');
    return successResponse(res, 200, 'Resume uploaded successfully', {
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAvatar,
  uploadResume,
};
