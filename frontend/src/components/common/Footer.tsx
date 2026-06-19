import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Code, Compass, Heart, MessageCircle } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Assessment', to: ROUTES.ASSESSMENT },
        { label: 'Career Paths', to: ROUTES.RECOMMENDATIONS },
        { label: 'Roadmaps', to: ROUTES.ROADMAP },
        { label: 'Pricing', to: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '#' },
        { label: 'Blog', to: '#' },
        { label: 'Careers', to: '#' },
        { label: 'Contact', to: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', to: '#' },
        { label: 'Privacy Policy', to: '#' },
        { label: 'Terms of Service', to: '#' },
        { label: 'FAQ', to: '#' },
      ],
    },
  ];

  return (
    <footer
      id="footer"
      style={{
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--bg-secondary)',
        padding: 'var(--space-4xl) 0 var(--space-xl)',
      }}
    >
      <div className="container">
        {/* Top Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to={ROUTES.HOME}
              id="footer-logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={20} color="white" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                }}
              >
                {APP_NAME}
              </span>
            </Link>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.7,
                maxWidth: '320px',
              }}
            >
              Empowering professionals to discover their ideal career path using
              AI-powered assessments and personalized learning roadmaps.
            </p>
            {/* Social */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                marginTop: 'var(--space-lg)',
              }}
            >
              {[
                { icon: <Code size={18} />, label: 'GitHub', id: 'footer-github' },
                { icon: <MessageCircle size={18} />, label: 'Twitter', id: 'footer-twitter' },
                { icon: <BriefcaseBusiness size={18} />, label: 'LinkedIn', id: 'footer-linkedin' },
              ].map((social) => (
                <a
                  key={social.id}
                  id={social.id}
                  href="#"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-lg)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      id={`footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 'var(--text-sm)',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border-glass)',
            marginBottom: 'var(--space-xl)',
          }}
        />

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-xs)',
            }}
          >
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Made by Love<Heart size={12} style={{ color: 'var(--error)' }} />by Ayush Deep and Varsha Rajput
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
