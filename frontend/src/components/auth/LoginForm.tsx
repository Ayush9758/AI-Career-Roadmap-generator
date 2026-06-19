import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/utils/validators';

interface LoginFormErrors {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginFormErrors>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateField = (field: keyof LoginFormErrors, value: string) => {
    let result;
    if (field === 'email') {
      result = validateEmail(value);
    } else {
      result = validatePassword(value);
    }
    setErrors((prev) => ({ ...prev, [field]: result.isValid ? '' : result.error }));
    return result.isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');

    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) return;

    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Invalid email or password. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
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
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Sign in to continue your journey
          </p>
        </header>

        {/* ---- Form ---- */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="login-email"
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
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="login-password"
                type="password"
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) validateField('password', e.target.value);
                }}
                onBlur={() => validateField('password', password)}
                style={{ paddingLeft: 38 }}
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <span className="form-error">
                <AlertCircle size={12} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={isSubmitting}
            style={{ marginTop: 'var(--space-sm)' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
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
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{
              color: 'var(--accent-secondary)',
              fontWeight: 600,
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
