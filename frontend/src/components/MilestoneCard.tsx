import {
  CheckCircle,
  Circle,
  ExternalLink,
  BookOpen,
  Video,
  GraduationCap,
  BookMarked,
  Wrench,
} from 'lucide-react';
import type { Milestone } from '@/types/roadmap.types';

interface MilestoneCardProps {
  milestone: Milestone;
  onToggle: (id: string) => void;
}

const resourceIcons: Record<string, React.ElementType> = {
  article: BookOpen,
  video: Video,
  course: GraduationCap,
  book: BookMarked,
  tool: Wrench,
};

export default function MilestoneCard({ milestone, onToggle }: MilestoneCardProps) {
  return (
    <div
      id={`milestone-${milestone.id}`}
      style={{
        display: 'flex',
        gap: 'var(--space-md)',
        padding: 'var(--space-md)',
        borderRadius: 'var(--radius-lg)',
        background: milestone.completed
          ? 'rgba(16, 185, 129, 0.06)'
          : 'var(--bg-glass)',
        border: milestone.completed
          ? '1px solid rgba(16, 185, 129, 0.2)'
          : '1px solid var(--border-glass)',
        transition: 'all var(--transition-fast)',
      }}
    >
      {/* Checkbox */}
      <button
        id={`milestone-toggle-${milestone.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(milestone.id);
        }}
        style={{
          flexShrink: 0,
          marginTop: 2,
          color: milestone.completed ? 'var(--success)' : 'var(--text-muted)',
          transition: 'all var(--transition-fast)',
          cursor: 'pointer',
        }}
        aria-label={milestone.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {milestone.completed ? (
          <CheckCircle size={22} style={{ animation: 'checkmark 0.3s ease-out' }} />
        ) : (
          <Circle size={22} />
        )}
      </button>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            color: milestone.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
            textDecoration: milestone.completed ? 'line-through' : 'none',
            marginBottom: 4,
          }}
        >
          {milestone.title}
        </h4>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--space-sm)',
            lineHeight: 1.5,
          }}
        >
          {milestone.description}
        </p>

        {/* Resources */}
        {milestone.resources.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)',
              marginTop: 'var(--space-sm)',
            }}
          >
            {milestone.resources.map((resource) => {
              const Icon = resourceIcons[resource.type] || BookOpen;
              return (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={12} />
                  {resource.title}
                  <ExternalLink size={10} style={{ opacity: 0.5 }} />
                </a>
              );
            })}
          </div>
        )}

        {/* Completed date */}
        {milestone.completed && milestone.completedAt && (
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--success)',
              marginTop: 'var(--space-sm)',
            }}
          >
            Completed on{' '}
            {new Date(milestone.completedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  );
}
