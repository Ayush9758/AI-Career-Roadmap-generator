import React, { useEffect, useRef } from 'react';

interface ProgressTrackerProps {
  progress: number; // 0-100
  milestonesCompleted: number;
  totalMilestones: number;
}

const SIZE = 160;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  milestonesCompleted,
  totalMilestones,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const prevProgress = useRef(0);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;

    const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
    // On initial mount, animate from zero; on subsequent changes, CSS transition handles it
    if (prevProgress.current === 0 && progress > 0) {
      el.style.strokeDashoffset = String(CIRCUMFERENCE);
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)';
        el.style.strokeDashoffset = String(offset);
      });
    } else {
      el.style.strokeDashoffset = String(offset);
    }
    prevProgress.current = progress;
  }, [progress]);

  return (
    <div id="progress-tracker" className="glass-card-static" style={styles.container}>
      {/* Ring */}
      <div style={styles.ringWrapper}>
        <svg width={SIZE} height={SIZE}>
          <defs>
            <linearGradient id="progress-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
          />

          {/* Fill */}
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#progress-ring-grad)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>

        {/* Center label */}
        <div style={styles.centerLabel}>
          <span style={styles.percentText}>{Math.round(progress)}</span>
          <span style={styles.percentSign}>%</span>
          <span style={styles.completeLabel}>Complete</span>
        </div>
      </div>

      {/* Milestone count */}
      <p style={styles.milestoneText}>
        <span style={styles.milestoneCount}>{milestonesCompleted}</span> of{' '}
        <span style={styles.milestoneCount}>{totalMilestones}</span> milestones completed
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)',
  },

  ringWrapper: {
    position: 'relative',
    width: SIZE,
    height: SIZE,
  },

  centerLabel: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  percentText: {
    fontSize: 'var(--text-4xl)',
    fontWeight: 800,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1,
  },

  percentSign: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-muted)',
    fontWeight: 600,
    marginTop: -2,
  },

  completeLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
    fontWeight: 500,
    marginTop: 2,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },

  milestoneText: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    textAlign: 'center',
  },

  milestoneCount: {
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
};

export default ProgressTracker;
