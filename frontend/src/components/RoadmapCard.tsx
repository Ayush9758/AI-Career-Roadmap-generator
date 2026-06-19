import { ChevronDown, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import type { RoadmapPhase } from '@/types/roadmap.types';

interface RoadmapCardProps {
  phase: RoadmapPhase;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  index: number;
}

export default function RoadmapCard({
  phase,
  isExpanded,
  onToggle,
  children,
  index,
}: RoadmapCardProps) {
  const completedCount = phase.milestones.filter((m) => m.completed).length;
  const totalCount = phase.milestones.length;
  const isComplete = phase.progress === 100;

  return (
    <div
      id={`roadmap-phase-${phase.id}`}
      style={{
        position: 'relative',
        paddingLeft: 40,
        animation: 'slideUp 0.5s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* Timeline node */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 24,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isComplete ? 'var(--success)' : 'var(--accent-gradient)',
          border: '3px solid var(--bg-primary)',
          boxShadow: isComplete
            ? '0 0 12px rgba(16, 185, 129, 0.5)'
            : '0 0 12px rgba(124, 58, 237, 0.4)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isComplete && <CheckCircle2 size={10} style={{ color: '#fff' }} />}
      </div>

      {/* Phase card */}
      <div
        className="glass-card-static"
        style={{
          cursor: 'pointer',
          transition: 'all var(--transition-base)',
          border: isExpanded
            ? '1px solid var(--accent-primary)'
            : '1px solid var(--border-glass)',
        }}
        onClick={onToggle}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-xs)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--accent-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Phase {phase.order}
              </span>
              {isComplete && <span className="badge badge-success">Complete</span>}
            </div>
            <h3
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                marginBottom: 4,
              }}
            >
              {phase.title}
            </h3>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              {phase.description}
            </p>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                <Clock size={14} />
                {phase.duration}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                <CheckCircle2 size={14} />
                {completedCount}/{totalCount} milestones
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expand icon */}
          <div
            style={{
              flexShrink: 0,
              color: 'var(--text-muted)',
              transition: 'transform var(--transition-fast)',
              transform: isExpanded ? 'rotate(0)' : 'rotate(0)',
            }}
          >
            {isExpanded ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
          </div>
        </div>

        {/* Expanded content: milestones */}
        {isExpanded && (
          <div
            style={{
              marginTop: 'var(--space-lg)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid var(--border-glass)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
