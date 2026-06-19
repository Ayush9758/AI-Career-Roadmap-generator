import RegisterForm from '@/components/auth/RegisterForm';
import { Compass } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';

export default function RegisterPage() {
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
          <h1>Join {APP_NAME}</h1>
          <p>
            Create an account to start your customized career diagnostics, get recommendations, and trace your learning paths with interactive milestones.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-panel">
        <RegisterForm />
      </div>
    </div>
  );
}
