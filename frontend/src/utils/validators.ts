// ============================================================
// Form Validation Functions
// ============================================================

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

const valid = (): ValidationResult => ({ isValid: true, error: '' });
const invalid = (error: string): ValidationResult => ({ isValid: false, error });

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return invalid('Email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return invalid('Please enter a valid email address');
  }
  return valid();
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return invalid('Password is required');
  }
  if (password.length < 8) {
    return invalid('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    return invalid('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    return invalid('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    return invalid('Password must contain at least one number');
  }
  return valid();
}

export function validateName(name: string): ValidationResult {
  if (!name.trim()) {
    return invalid('Name is required');
  }
  if (name.trim().length < 2) {
    return invalid('Name must be at least 2 characters long');
  }
  if (name.trim().length > 50) {
    return invalid('Name must be less than 50 characters');
  }
  return valid();
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword) {
    return invalid('Please confirm your password');
  }
  if (password !== confirmPassword) {
    return invalid('Passwords do not match');
  }
  return valid();
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return invalid(`${fieldName} is required`);
  }
  return valid();
}
