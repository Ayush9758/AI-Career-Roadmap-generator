import React, { useEffect, useRef } from 'react';
import {
  Code2,
  Brain,
  Cloud,
  Palette,
  Database,
  TrendingUp,
  DollarSign,
  BarChart3,
  Scale,
  Pill,
  Shield,
} from 'lucide-react';
import type { CareerRecommendation } from '@/types/career.types';

interface CareerCardProps {
  career: CareerRecommendation;
  index: number;
  onGenerateRoadmap: (careerId: string) => void;
}

/* Map icon string keys from the data model to lucide-react components */
const ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  'code-2': Code2,
  brain: Brain,
  cloud: Cloud,
  palette: Palette,
  database: Database,
  scale: Scale,
  pill: Pill,
  shield: Shield,
  'trending-up': TrendingUp,
};

const DEMAND_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  High: {
    bg: 'rgba(16, 185, 129, 0.15)',
    color: 'var(--success-light)',
    border: 'rgba(16, 185, 129, 0.25)',
  },
  Medium: {
    bg: 'rgba(245, 158, 11, 0.15)',
    color: 'var(--warning-light)',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  Low: {
    bg: 'rgba(239, 68, 68, 0.15)',
    color: 'var(--error-light)',
    border: 'rgba(239, 68, 68, 0.25)',
  },
};

// SVG ring geometry
const RING_SIZE = 120;
const STROKE_WIDTH = 8;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CareerCard: React.FC<CareerCardProps> = ({ career, index, onGenerateRoadmap }) => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Animate ring fill after mount
    const el = circleRef.current;
    if (el) {
      const offset = CIRCUMFERENCE - (career.matchScore / 100) * CIRCUMFERENCE;
      // Start from full offset, then animate to target
      el.style.strokeDashoffset = String(CIRCUMFERENCE);
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
        el.style.strokeDashoffset = String(offset);
      });
    }
  }, [career.matchScore]);

  const IconComponent = ICON_MAP[career.icon] ?? Code2;
  const demand = DEMAND_COLORS[career.demandLevel] ?? DEMAND_COLORS.Medium;

  return (
    <article
      id={`career-card-${career.id}`}
      className="glass-card animate-slide-up"
      style={{
        ...styles.card,
        animationDelay: `${index * 0.12}s`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      {/* Top row: icon + category */}
      <div style={styles.topRow}>
        <div style={styles.iconCircle}>
          <IconComponent size={22} strokeWidth={1.8} />
        </div>
        <span className="badge">{career.category}</span>
      </div>

      {/* Match Score Ring */}
      <div style={styles.ringContainer}>
        <svg width={RING_SIZE} height={RING_SIZE} style={styles.ringSvg}>
          <defs>
            <linearGradient id={`grad-${career.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Animated fill */}
          <circle
            ref={circleRef}
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`url(#grad-${career.id})`}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </svg>
        <div style={styles.ringLabel}>
          <span className="gradient-text" style={styles.ringPercent}>
            {career.matchScore}
          </span>
          <span style={styles.ringUnit}>% match</span>
        </div>
      </div>

      {/* Title & description */}
      <h3 style={styles.title}>{career.title}</h3>
      <p style={styles.description}>{career.description}</p>

      {/* Skills */}
      <div style={styles.skillsRow}>
        {career.skills.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <DollarSign size={14} style={{ color: 'var(--success-light)' }} />
          <span style={styles.statText}>{career.avgSalary}</span>
        </div>
        <div style={styles.statItem}>
          <TrendingUp size={14} style={{ color: 'var(--accent-secondary-light)' }} />
          <span style={styles.statText}>{career.growthRate}</span>
        </div>
        <div
          style={{
            ...styles.demandBadge,
            background: demand.bg,
            color: demand.color,
            borderColor: demand.border,
          }}
        >
          <BarChart3 size={12} />
          {career.demandLevel} Demand
        </div>
      </div>

      {/* CTA */}
      <button
        id={`generate-roadmap-${career.id}`}
        className="btn btn-primary w-full"
        onClick={() => onGenerateRoadmap(career.id)}
        style={{ marginTop: 'var(--space-lg)' }}
      >
        Generate Roadmap →
      </button>
    </article>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 'var(--space-md)',
  },

  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 'var(--radius-lg)',
    background: 'var(--accent-gradient-subtle)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent-secondary-light)',
  },

  /* Ring */
  ringContainer: {
    position: 'relative',
    width: RING_SIZE,
    height: RING_SIZE,
    margin: 'var(--space-sm) 0',
  },

  ringSvg: {
    display: 'block',
  },

  ringLabel: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ringPercent: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 800,
    lineHeight: 1,
  },

  ringUnit: {
    fontSize: 'var(--text-xs)',
    color: 'var(--text-muted)',
    marginTop: 2,
  },

  /* Text */
  title: {
    fontSize: 'var(--text-xl)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },

  description: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },

  /* Skills */
  skillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--space-xs)',
    marginTop: 'var(--space-xs)',
  },

  /* Stats */
  statsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    marginTop: 'var(--space-sm)',
    width: '100%',
  },

  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 'var(--text-xs)',
    color: 'var(--text-secondary)',
  },

  statText: {
    fontWeight: 500,
  },

  demandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '0.2rem 0.6rem',
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    border: '1px solid',
  },
};

export default CareerCard;
