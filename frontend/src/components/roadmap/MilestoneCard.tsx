import React from 'react';
import {
  BookOpen,
  Video,
  GraduationCap,
  BookMarked,
  Wrench,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import type { Milestone, Resource } from '@/types/roadmap.types';

interface MilestoneCardProps {
  milestone: Milestone;
  onToggle: (id: string) => void;
}

const RESOURCE_ICONS: Record<Resource['type'], React.FC<{ size?: number }>> = {
  article: BookOpen,
  video: Video,
  course: GraduationCap,
  book: BookMarked,
  tool: Wrench,
};

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onToggle }) => {
  const { completed } = milestone;

  return (
    <div
      id={`milestone-${milestone.id}`}
      style={{
        ...styles.card,
        opacity: completed ? 0.7 : 1,
        borderLeftColor: completed ? 'var(--success)' : 'transparent',
      }}
    >
      {/* Checkbox area */}
      <button
        type="button"
        aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        onClick={() => onToggle(milestone.id)}
        style={styles.checkboxBtn}
      >
        <div
          style={{
            ...styles.checkbox,
            ...(completed ? styles.checkboxDone : {}),
          }}
        >
          {completed && (
            <CheckCircle2
              size={22}
              style={{
                color: '#fff',
                animation: 'checkmark 0.35s ease-out',
              }}
            />
          )}
        </div>
      </button>

      {/* Content */}
      <div style={styles.body}>
        <h4
          style={{
            ...styles.title,
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'var(--text-muted)' : 'var(--text-primary)',
          }}
        >
          {milestone.title}
        </h4>

        <p
          style={{
            ...styles.description,
            color: completed ? 'var(--text-muted)' : 'var(--text-secondary)',
          }}
        >
          {milestone.description}
        </p>

        {/* Resources */}
        {milestone.resources.length > 0 && (
          <div style={styles.resources}>
            {milestone.resources.map((resource, idx) => {
              const Icon = RESOURCE_ICONS[resource.type] ?? BookOpen;
              return (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.resourceLink}
                >
                  <Icon size={14} />
                  <span style={styles.resourceTitle}>{resource.title}</span>
                  <ExternalLink size={11} style={{ opacity: 0.4, flexShrink: 0 }} />
                </a>
              );
            })}
          </div>
        )}

        {/* Completed timestamp */}
        {completed && milestone.completedAt && (
          <span style={styles.timestamp}>
            Completed on{' '}
            {new Date(milestone.completedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    background: 'var(--bg-glass)',
    borderRadius: 'var(--radius-lg)',
    borderLeft: '3px solid transparent',
    transition: 'all var(--transition-base)',
  },

  /* Checkbox */
  checkboxBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: 2,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: '2px solid var(--border-glass-hover)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
    background: 'transparent',
  },

  checkboxDone: {
    background: 'var(--success)',
    borderColor: 'var(--success)',
  },

  /* Body */
  body: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },

  title: {
    fontSize: 'var(--text-base)',
    fontWeight: 600,
    lineHeight: 1.3,
    transition: 'color var(--transition-fast)',
  },

  description: {
    fontSize: 'var(--text-sm)',
    lineHeight: 1.5,
  },

  /* Resources */
  resources: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginTop: 'var(--space-sm)',
  },

  resourceLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 'var(--text-xs)',
    color: 'var(--accent-secondary)',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(6, 182, 212, 0.06)',
    border: '1px solid rgba(6, 182, 212, 0.1)',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
    width: 'fit-content',
    maxWidth: '100%',
  },

  resourceTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  timestamp: {
    fontSize: 'var(--text-xs)',
    color: 'var(--success)',
    fontWeight: 500,
    marginTop: 'var(--space-xs)',
  },
};

export default MilestoneCard;
