import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Compass,
  Map,
  User,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // hooks for authentication
import { ROUTES } from '@/utils/constants';

interface SidebarProps {          
  isOpen?: boolean;               
  onClose?: () => void;            
}

interface SidebarNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <LayoutDashboard size={20} /> },
  { label: 'Assessment', path: ROUTES.ASSESSMENT, icon: <ClipboardList size={20} /> },
  { label: 'Recommendations', path: ROUTES.RECOMMENDATIONS, icon: <Compass size={20} /> },
  { label: 'Roadmap', path: ROUTES.ROADMAP, icon: <Map size={20} /> },
  { label: 'Profile', path: ROUTES.PROFILE, icon: <User size={20} /> },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: '80px',
    width: '260px',
    height: 'calc(100vh - 80px)',
    background: 'rgba(10, 10, 26, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid var(--border-glass)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 200,
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
  };

  const navSectionStyle: React.CSSProperties = {
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    background: active ? 'var(--bg-glass-hover)' : 'transparent',
    borderLeft: active
      ? '3px solid transparent'
      : '3px solid transparent',
    backgroundImage: active ? undefined : undefined,
    position: 'relative',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  });

  const activeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '8px',
    bottom: '8px',
    width: '3px',
    background: 'var(--accent-gradient)',
    borderRadius: '0 2px 2px 0',
  };

  const iconWrapperStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-sm)',
    background: active ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-glass)',
    color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  });

  const userCardStyle: React.CSSProperties = {
    padding: '20px 16px',
    borderTop: '1px solid var(--border-glass)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const userAvatarStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--accent-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '16px',
    flexShrink: 0,
  };

  const userInfoStyle: React.CSSProperties = {
    overflow: 'hidden',
  };

  const userNameTextStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
  };

  const userEmailStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
  };

  const closeBtnStyle: React.CSSProperties = {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    position: 'absolute',
    top: '16px',
    right: '16px',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    top: '80px',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 199,
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    padding: '0 16px',
    marginBottom: '8px',
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          style={overlayStyle}
          className="sidebar-overlay"
          onClick={onClose}
          id="sidebar-overlay"
        />
      )}

      <aside
        id="dashboard-sidebar"
        style={sidebarStyle}
        className={isOpen ? 'sidebar-visible' : 'sidebar-hidden'}
      >
        {/* Close button for mobile */}
        <button
          id="sidebar-close-btn"
          style={closeBtnStyle}
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Navigation */}
        <nav style={navSectionStyle}>
          <span style={sectionLabelStyle}>Navigation</span>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              id={`sidebar-link-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              style={navItemStyle(isActive(item.path))}
              onClick={onClose}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'var(--bg-glass-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {isActive(item.path) && <span style={activeIndicatorStyle} />}
              <span style={iconWrapperStyle(isActive(item.path))}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Card at Bottom */}
        {user && (
          <div style={userCardStyle} id="sidebar-user-card">
            <div style={userAvatarStyle}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={userInfoStyle}>
              <p style={userNameTextStyle}>{user.name}</p>
              <p style={userEmailStyle}>{user.email}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Responsive Styles */}
      <style>{`
        .sidebar-overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          #dashboard-sidebar {
            transform: translateX(-100%);
          }
          #dashboard-sidebar.sidebar-visible {
            transform: translateX(0);
          }
          .sidebar-close-btn {
            display: flex !important;
          }
          .sidebar-overlay {
            display: block !important;
          }
        }

        @media (min-width: 1025px) {
          #dashboard-sidebar {
            transform: translateX(0) !important;
          }
          .sidebar-overlay {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
