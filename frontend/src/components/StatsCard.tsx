import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

export default function StatsCard({
  id,
  icon: Icon,
  label,
  value,
  color = 'var(--accent-primary)',
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      id={id}
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-lg)',
        animation: 'slideUp 0.5s ease-out forwards',
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 'var(--radius-lg)',
          background: `${color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <p
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
