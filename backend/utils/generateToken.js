const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token for a user
 * @param {string} userId - The database ID of the user
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'super_secret_jwt_signing_key_change_me_in_production',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

module.exports = generateToken;
