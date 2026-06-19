import React from 'react';
import { ChevronDown, Clock } from 'lucide-react';
import type { RoadmapPhase } from '@/types/roadmap.types';

interface RoadmapCardProps {
  phase: RoadmapPhase;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ phase, isExpanded, onToggle, children }) => {
  return (
    <div style={styles.timelineItem}>
      {/* Vertical timeline connector */}
      <div style={styles.timelineLine} />

      <section
        id={`phase-${phase.id}`}
        className="glass-card-static"
        style={styles.card}
      >
        {/* Header — clickable */}
        <button
          type="button"
          onClick={onToggle}
          style={styles.header}
          aria-expanded={isExpanded}
        >
          {/* Phase number circle */}
          <div style={styles.phaseCircle}>
            <span style={styles.phaseNumber}>{phase.order}</span>
          </div>

          <div style={styles.headerText}>
            <h3 style={styles.title}>{phase.title}</h3>
            <p style={styles.description}>{phase.description}</p>
          </div>

          <div style={styles.headerRight}>
            <span style={styles.durationBadge}>
              <Clock size={13} />
              {phase.duration}
            </span>

            <ChevronDown
              size={20}
              style={{
                ...styles.chevron,
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </button>

        {/* Progress bar */}
        <div style={styles.progressArea}>
          <div style={styles.progressMeta}>
            <span style={styles.progressLabel}>Progress</span>
            <span style={styles.progressValue}>{phase.progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${phase.progress}%` }}
            />
          </div>
        </div>

        {/* Collapsible content */}
        <div
          style={{
            ...styles.content,
            maxHeight: isExpanded ? 2000 : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 'var(--space-lg)' : 0,
            paddingTop: isExpanded ? 'var(--space-lg)' : 0,
            borderTop: isExpanded ? '1px solid var(--border-glass)' : '1px solid transparent',
          }}
        >
          {children}
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  timelineItem: {
    position: 'relative',
    paddingLeft: 28,
  },

  timelineLine: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary), transparent)',
    borderRadius: 'var(--radius-full)',
  },

  card: {
    borderLeft: '3px solid transparent',
    borderImage: 'var(--accent-gradient-vertical) 1',
    overflow: 'hidden',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-md)',
    width: '100%',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: 0,
    color: 'inherit',
  },

  phaseCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  phaseNumber: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 'var(--text-base)',
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 'var(--text-lg)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 4,
  },

  description: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    flexShrink: 0,
  },

  durationBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '0.25rem 0.7rem',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    background: 'var(--accent-gradient-subtle)',
    color: 'var(--accent-secondary-light)',
    border: '1px solid rgba(6, 182, 212, 0.2)',
    whiteSpace: 'nowrap',
  },

  chevron: {
    color: 'var(--text-muted)',
    transition: 'transform var(--transition-base)',
    flexShrink: 0,
  },

  /* Progress */
  progressArea: {
    marginTop: 'var(--space-md)',
  },

  progressMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  progressLabel: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
  },

  progressValue: {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },

  /* Collapsible content */
  content: {
    overflow: 'hidden',
    transition:
      'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, margin-top 0.4s ease, padding-top 0.4s ease, border-color 0.4s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
};

export default RoadmapCard;
