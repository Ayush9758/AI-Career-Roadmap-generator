interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({
  message = 'Loading...',
  fullScreen = true,
}: LoaderProps) {
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10, 10, 26, 0.85)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    animation: 'fadeIn 0.3s ease',
  };

  const inlineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    animation: 'fadeIn 0.3s ease',
  };

  const spinnerContainerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
  };

  const messageStyle: React.CSSProperties = {
    marginTop: '24px',
    fontSize: '16px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    animation: 'pulse-glow 2s ease-in-out infinite',
    textAlign: 'center',
  };

  const containerStyle = fullScreen ? overlayStyle : inlineStyle;

  return (
    <div
      id={fullScreen ? 'fullscreen-loader' : 'inline-loader'}
      style={containerStyle}
      role="status"
      aria-label={message}
    >
      <div style={spinnerContainerStyle}>
        <svg
          viewBox="0 0 50 50"
          width="60"
          height="60"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#loader-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80 50"
          />
        </svg>
      </div>
      <p style={messageStyle} id="loader-message">
        {message}
      </p>
    </div>
  );
}
