import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Map, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, APP_NAME } from '@/utils/constants';

const navLinks = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Assessment', path: ROUTES.ASSESSMENT, icon: Sparkles },
  { label: 'Roadmap', path: ROUTES.ROADMAP, icon: Map },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-xl)',
        background: 'rgba(10, 10, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-glass)',
        zIndex: 'var(--z-navbar)' as string,
        animation: 'slideDown 0.4s ease-out',
      }}
    >
      {/* Logo */}
      <Link
        id="navbar-logo"
        to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          textDecoration: 'none',
        }}
      >
        <Sparkles size={28} style={{ color: 'var(--accent-primary)' }} />
        <span
          className="gradient-text"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
          }}
        >
          {APP_NAME}
        </span>
      </Link>

      {/* Desktop Nav Links */}
      {isAuthenticated && (
        <div
          className="hide-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                id={`nav-link-${link.label.toLowerCase()}`}
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-glass-active)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {isAuthenticated && user ? (
          <div style={{ position: 'relative' }}>
            <button
              id="navbar-user-menu"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hide-mobile" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                {user.name}
              </span>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: 200,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-sm)',
                  boxShadow: 'var(--shadow-lg)',
                  animation: 'scaleIn 0.2s ease-out',
                  zIndex: 'var(--z-dropdown)' as string,
                }}
              >
                <Link
                  id="dropdown-profile"
                  to={ROUTES.PROFILE}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <User size={16} />
                  Profile
                </Link>
                <button
                  id="dropdown-logout"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--error-light)',
                    width: '100%',
                    fontSize: 'var(--text-sm)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Link id="navbar-login" to={ROUTES.LOGIN} className="btn btn-ghost">
              Sign In
            </Link>
            <Link id="navbar-register" to={ROUTES.REGISTER} className="btn btn-primary">
              Get Started
            </Link>
          </div>
        )}

        {/* Mobile menu toggle */}
        {isAuthenticated && (
          <button
            id="navbar-mobile-toggle"
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'var(--text-primary)', padding: 4 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && isAuthenticated && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-glass)',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            animation: 'slideDown 0.3s ease-out',
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color:
                    location.pathname === link.path
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 'var(--text-base)',
                }}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
