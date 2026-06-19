import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, LogIn, UserPlus } from 'lucide-react'; // Importing Symbols
import { ROUTES, APP_NAME } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  let user = null;
  let isAuthenticated = false;
  let logout = () => {};
  try {
    const auth = useAuth();
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;
  } catch {
    // AuthProvider not available — render as guest
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsMobileOpen(false);
  }

  const navLinks = isAuthenticated
    ? [
        { to: ROUTES.DASHBOARD, label: 'Dashboard' },
        { to: ROUTES.ASSESSMENT, label: 'Assessment' },
        { to: ROUTES.RECOMMENDATIONS, label: 'Careers' },
      ]
    : [
        { to: '/#features', label: 'Features' },
        { to: '/#process', label: 'How It Works' },
      ];

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        padding: '0 var(--space-lg)',
        transition: 'all var(--transition-base)',
        background: isScrolled
          ? 'rgba(10, 10, 26, 0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid var(--border-glass)'
          : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}
      >
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          id="navbar-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Compass size={22} color="white" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'var(--text-xl)',
            }}
          >
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          className="hide-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xl)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              id={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              style={{
                color:
                  location.pathname === link.to
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}
        >
          {isAuthenticated ? (
            <>
              <span
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-sm)',
                  marginRight: 'var(--space-sm)',
                }}
              >
                {user?.name}
              </span>
              <button
                id="navbar-logout"
                className="btn btn-ghost btn-sm"
                onClick={logout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                id="navbar-login"
                className="btn btn-ghost btn-sm"
              >
                <LogIn size={16} /> Sign In
              </Link>
              <Link
                to={ROUTES.REGISTER}
                id="navbar-register"
                className="btn btn-primary btn-sm"
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          id="navbar-mobile-toggle"
          className="show-mobile btn btn-ghost btn-icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation"
          style={{ display: 'none' }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="show-mobile"
          style={{
            padding: 'var(--space-lg)',
            background: 'rgba(10, 10, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-glass)',
            display: 'none',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: 'var(--text-secondary)',
                  padding: 'var(--space-sm) 0',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link to={ROUTES.LOGIN} className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                  Sign In
                </Link>
                <Link to={ROUTES.REGISTER} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
