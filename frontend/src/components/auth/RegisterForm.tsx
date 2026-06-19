import { useState, useMemo, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators';

interface RegisterFormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMPTY_ERRORS: RegisterFormErrors = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

/** Returns a score from 0-4 describing password strength. */
function getPasswordStrength(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_META: Record<number, { label: string; color: string }> = {
  0: { label: '', color: 'transparent' },
  1: { label: 'Weak', color: 'var(--error)' },
  2: { label: 'Fair', color: 'var(--warning)' },
  3: { label: 'Good', color: 'var(--accent-primary)' },
  4: { label: 'Strong', color: 'var(--success)' },
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterFormErrors>(EMPTY_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const meta = STRENGTH_META[strength];

  /* ---- field-level validation ---- */
  const validateField = (field: keyof RegisterFormErrors, value: string) => {
    let result;
    switch (field) {
      case 'name':
        result = validateName(value);
        break;
      case 'email':
        result = validateEmail(value);
        break;
      case 'password':
        result = validatePassword(value);
        break;
      case 'confirmPassword':
        result = validateConfirmPassword(password, value);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: result.isValid ? '' : result.error }));
    return result.isValid;
  };

  /* ---- submit ---- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');

    const nameOk = validateField('name', name);
    const emailOk = validateField('email', email);
    const pwOk = validateField('password', password);
    const cpwOk = validateField('confirmPassword', confirmPassword);

    if (!nameOk || !emailOk || !pwOk || !cpwOk) return;

    setIsSubmitting(true);
    try {
      await register({ name, email, password, confirmPassword });
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---- shared icon positioning ---- */
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  };

  return (
    <div className="animate-scale-in" style={{ width: '100%', maxWidth: 420 }}>
      <div className="glass-card-static" style={{ padding: 'var(--space-2xl)' }}>
        {/* ---- Server Error Banner ---- */}
        {serverError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: 'var(--space-md)',
              marginBottom: 'var(--space-xl)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: 'var(--error-light)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{serverError}</span>
          </div>
        )}

        {/* ---- Heading ---- */}
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h1
            className="gradient-text"
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--space-sm)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Create Account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Start your career journey today
          </p>
        </header>

        {/* ---- Form ---- */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={iconStyle} />
              <input
                id="register-name"
                type="text"
                className={`form-input${errors.name ? ' error' : ''}`}
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) validateField('name', e.target.value);
                }}
                onBlur={() => validateField('name', name)}
                style={{ paddingLeft: 38 }}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <span className="form-error">
                <AlertCircle size={12} />
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={iconStyle} />
              <input
                id="register-email"
                type="email"
                className={`form-input${errors.email ? ' error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) validateField('email', e.target.value);
                }}
                onBlur={() => validateField('email', email)}
                style={{ paddingLeft: 38 }}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="form-error">
                <AlertCircle size={12} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={iconStyle} />
              <input
                id="register-password"
                type="password"
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) validateField('password', e.target.value);
                }}
                onBlur={() => validateField('password', password)}
                style={{ paddingLeft: 38 }}
                autoComplete="new-password"
              />
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div style={{ marginTop: 'var(--space-xs)' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 'var(--radius-full)',
                        background: strength >= seg ? meta.color : 'var(--bg-glass)',
                        transition: 'background var(--transition-fast)',
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: meta.color,
                    fontWeight: 500,
                  }}
                >
                  {meta.label}
                </span>
              </div>
            )}

            {errors.password && (
              <span className="form-error">
                <AlertCircle size={12} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={16} style={iconStyle} />
              <input
                id="register-confirm-password"
                type="password"
                className={`form-input${errors.confirmPassword ? ' error' : ''}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    validateField('confirmPassword', e.target.value);
                }}
                onBlur={() => validateField('confirmPassword', confirmPassword)}
                style={{ paddingLeft: 38 }}
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && (
              <span className="form-error">
                <AlertCircle size={12} />
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={isSubmitting}
            style={{ marginTop: 'var(--space-sm)' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* ---- Footer link ---- */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-xl)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
          }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: 'var(--accent-secondary)',
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
