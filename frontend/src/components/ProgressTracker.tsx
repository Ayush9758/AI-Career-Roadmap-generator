import { TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface ProgressTrackerProps {
  milestonesCompleted: number;
  totalMilestones: number;
}

export default function ProgressTracker({
  milestonesCompleted,
  totalMilestones,
}: ProgressTrackerProps) {
  const progressPercent = totalMilestones
    ? Math.round((milestonesCompleted / totalMilestones) * 100)
    : 0;

  return (
    <div
      id="progress-tracker"
      className="glass-card-static"
      style={{ animation: 'slideUp 0.6s ease-out forwards', animationDelay: '0.3s', opacity: 0 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <TrendingUp size={20} style={{ color: 'var(--accent-secondary)' }} />
          <h3
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
            }}
          >
            Career Progress
          </h3>
        </div>
        <span className="badge">{progressPercent}% Complete</span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ height: 12, marginBottom: 'var(--space-lg)' }}>
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <CheckCircle size={16} style={{ color: 'var(--success)' }} />
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{milestonesCompleted}</strong>{' '}
            completed
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <Clock size={16} style={{ color: 'var(--warning)' }} />
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>
              {totalMilestones - milestonesCompleted}
            </strong>{' '}
            remaining
          </span>
        </div>
      </div>
    </div>
  );
}
