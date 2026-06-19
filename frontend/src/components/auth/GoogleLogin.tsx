import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Classic 4-color Google "G" logo rendered as inline SVG.
 */
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function GoogleLogin() {
  const { googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await googleLogin('mock-google-credential-token');
    } catch {
      // errors are typically surfaced by the auth context / parent form
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      id="google-login-btn"
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="animate-fade-in delay-2"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-sm)',
        width: '100%',
        padding: '0.85rem 1.5rem',
        fontSize: 'var(--text-base)',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        color: 'var(--text-primary)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-glass-hover)',
        borderRadius: 'var(--radius-lg)',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.6 : 1,
        transition: 'all var(--transition-base)',
      }}
      onMouseEnter={(e) => {
        if (isLoading) return;
        const btn = e.currentTarget;
        btn.style.transform = 'translateY(-2px)';
        btn.style.borderColor = 'var(--accent-secondary)';
        btn.style.boxShadow = 'var(--shadow-glow-cyan)';
        btn.style.background = 'var(--bg-glass-hover)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.transform = 'translateY(0)';
        btn.style.borderColor = 'var(--border-glass-hover)';
        btn.style.boxShadow = 'none';
        btn.style.background = 'var(--bg-glass)';
      }}
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <GoogleLogo size={20} />
      )}
      Continue with Google
    </button>
  );
}
