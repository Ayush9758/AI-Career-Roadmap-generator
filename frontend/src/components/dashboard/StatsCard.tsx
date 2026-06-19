import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}

/**
 * Converts a label string into a kebab-case slug for use as part of the id.
 * e.g. "Total Hours" → "total-hours"
 */
const toKebab = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, trend, color }) => {
  const isPositiveTrend = trend ? trend.startsWith('+') : undefined;
  const trendColor = isPositiveTrend === true ? 'var(--success-light)' : 'var(--error-light)';

  return (
    <div
      id={`stat-${toKebab(label)}`}
      className="glass-card-static"
      style={styles.card}
    >
      {/* Icon */}
      <div
        style={{
          ...styles.iconCircle,
          ...(color
            ? { background: `linear-gradient(135deg, ${color}33, ${color}1a)` }
            : {}),
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <span style={styles.value}>{value}</span>

      {/* Label */}
      <span style={styles.label}>{label}</span>

      {/* Trend */}
      {trend && (
        <div style={{ ...styles.trend, color: trendColor }}>
          {isPositiveTrend ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    minWidth: 160,
    padding: 'var(--space-lg)',
    transition: 'box-shadow var(--transition-base), transform var(--transition-base)',
    cursor: 'default',
    // Hover glow is handled by the onMouseEnter/Leave or :hover via class
    // Since we use glass-card-static, we add subtle glow interaction via CSS vars
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-lg)',
    background: 'var(--accent-gradient-subtle)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent-secondary-light)',
    marginBottom: 'var(--space-xs)',
  },

  value: {
    fontSize: 'var(--text-2xl)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    lineHeight: 1.1,
  },

  label: {
    fontSize: 'var(--text-sm)',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },

  trend: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    marginTop: 2,
  },
};

export default StatsCard;
