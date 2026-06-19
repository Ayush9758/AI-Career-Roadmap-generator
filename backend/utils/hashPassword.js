const bcrypt = require('bcryptjs');

/**
 * Hashes a plaintext password
 * @param {string} password - The plaintext password
 * @returns {Promise<string>} The hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = hashPassword;
