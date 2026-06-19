import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Compass,
  Map,
  User,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '@/utils/constants';

interface SidebarLink {
  label: string;
  path: string;
  icon: React.ElementType;
}

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Assessment', path: ROUTES.ASSESSMENT, icon: ClipboardList },
  { label: 'Recommendations', path: ROUTES.RECOMMENDATIONS, icon: Compass },
  { label: 'Roadmap', path: ROUTES.ROADMAP, icon: Map },
  { label: 'Profile', path: ROUTES.PROFILE, icon: User },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      id="dashboard-sidebar"
      className="hide-mobile"
      style={{
        position: 'fixed',
        top: 80,
        left: 0,
        width: 260,
        height: 'calc(100vh - 80px)',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-glass)',
        padding: 'var(--space-lg) var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        zIndex: 'var(--z-sidebar)' as string,
        overflowY: 'auto',
        animation: 'slideInLeft 0.4s ease-out',
      }}
    >
      <div
        style={{
          padding: '0 var(--space-sm)',
          marginBottom: 'var(--space-md)',
        }}
      >
        <p
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Navigation
        </p>
      </div>

      {sidebarLinks.map((link) => {
        const isActive = location.pathname === link.path;
        const Icon = link.icon;
        return (
          <Link
            id={`sidebar-link-${link.label.toLowerCase()}`}
            key={link.path}
            to={link.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: '0.7rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--bg-glass-active)' : 'transparent',
              textDecoration: 'none',
              fontSize: 'var(--text-sm)',
              fontWeight: isActive ? 600 : 400,
              transition: 'all var(--transition-fast)',
              position: 'relative',
            }}
          >
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  bottom: '20%',
                  width: 3,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--accent-gradient)',
                }}
              />
            )}
            <Icon size={18} />
            {link.label}
          </Link>
        );
      })}

      {/* Bottom decoration */}
      <div style={{ marginTop: 'auto', padding: 'var(--space-md)' }}>
        <div
          className="glass-card-static"
          style={{
            padding: 'var(--space-md)',
            textAlign: 'center',
            background: 'var(--accent-gradient-subtle)',
          }}
        >
          <Sparkles
            size={24}
            style={{ color: 'var(--accent-secondary)', margin: '0 auto var(--space-sm)' }}
          />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            AI-Powered Career Insights
          </p>
        </div>
      </div>
    </aside>
  );
}
