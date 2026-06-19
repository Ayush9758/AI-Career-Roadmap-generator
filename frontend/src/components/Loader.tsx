import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({ message = 'Loading...', fullScreen = false }: LoaderProps) {
  return (
    <div
      id="loader"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-lg)',
        minHeight: fullScreen ? '100vh' : '300px',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'var(--accent-gradient-subtle)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        <Loader2
          size={28}
          style={{
            color: 'var(--accent-primary)',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
      {message && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
