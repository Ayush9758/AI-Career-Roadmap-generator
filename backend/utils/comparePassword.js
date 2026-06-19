const bcrypt = require('bcryptjs');

/**
 * Compares a plaintext password with a hashed password
 * @param {string} password - The plaintext password
 * @param {string} hashedPassword - The hashed password stored in database
 * @returns {Promise<boolean>} Match result
 */
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = comparePassword;
