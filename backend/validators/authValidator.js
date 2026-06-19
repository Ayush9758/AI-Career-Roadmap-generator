/**
 * Validator for authentication payloads
 */

const validateRegister = (data) => {
  const errors = {};
  const { name, email, password, confirmPassword } = data || {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = 'Name is required and must be a string';
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'A valid email is required';
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    error: hasErrors ? errors : null,
    value: data,
  };
};

const validateLogin = (data) => {
  const errors = {};
  const { email, password } = data || {};

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    error: hasErrors ? errors : null,
    value: data,
  };
};

module.exports = {
  validateRegister,
  validateLogin,
};
