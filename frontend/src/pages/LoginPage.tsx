import LoginForm from '@/components/auth/LoginForm';
import { Compass } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';

export default function LoginPage() {
  return (
    <div className="auth-layout">
      {/* Decorative Side */}
      <div className="auth-decorative">
        <div className="auth-decorative-content">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            <Compass size={36} color="white" />
          </div>
          <h1>{APP_NAME}</h1>
          <p>
            Assess your potential, discover career pathways, and unlock custom AI-generated roadmaps to reach your goals.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-panel">
        <LoginForm />
      </div>
    </div>
  );
}
