import { Link } from 'react-router-dom';
import { Sparkles, Map, Compass, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="page-wrapper" style={{ flex: 1 }}>
        <div className="bg-landing-megatron" />

        {/* Hero Section */}
        <section className="section" style={{ textAlign: 'center', padding: 'var(--space-4xl) 0 var(--space-2xl)' }}>
          <div className="container container-md animate-slide-up">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-gradient-subtle)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'var(--accent-secondary-light)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                marginBottom: 'var(--space-lg)',
              }}
            >
              <Sparkles size={16} />
              AI-Powered Career Guidance
            </div>

            <h1 style={{ fontSize: 'var(--text-6xl)', fontWeight: 800, lineHeight: 1.15, marginBottom: 'var(--space-lg)' }}>
              Navigate Your Career with <span className="gradient-text">Precision</span>
            </h1>

            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                margin: '0 auto var(--space-2xl)',
                lineHeight: 1.6,
              }}
            >
              Discover your ideal career path through AI-driven self-assessments and get a personalized, interactive learning roadmap tailored to your goals.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-md)',
                flexWrap: 'wrap',
              }}
            >
              <Link
                id="hero-cta-start"
                to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}
                className="btn btn-primary btn-lg"
              >
                Start Free Assessment
                <ChevronRight size={20} />
              </Link>
              <a href="#features" className="btn btn-secondary btn-lg">
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section" style={{ borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }} className="animate-fade-in">
              <h2 className="section-title">Everything You Need to Succeed</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                We combine AI diagnostics with structured curriculums to guide you from beginner to professional.
              </p>
            </div>

            <div className="grid-3">
              {/* Feature 1 */}
              <div className="glass-card animate-slide-up delay-1" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--accent-gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary-light)',
                  }}
                >
                  <Compass size={24} />
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>AI Career Diagnostic</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Take a comprehensive assessment of your background, experience, interests, and salary goals to identify matching paths.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card animate-slide-up delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--accent-gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-secondary-light)',
                  }}
                >
                  <Map size={24} />
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Custom Interactive Roadmaps</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Get step-by-step learning milestones generated by AI. Track your progress, tick off tasks, and see your progress grow.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card animate-slide-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--accent-gradient-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--success-light)',
                  }}
                >
                  <BookOpen size={24} />
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Curated Learning Resources</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Access hand-picked tutorials, books, documentation, and videos for every single milestone in your learning path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="section" style={{ borderTop: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Your journey to your dream career starts here. Follow these simple steps.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3xl)',
                position: 'relative',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Create an Account & Take Diagnostic',
                  desc: 'Sign up in seconds and answer our AI-guided career diagnostic about your experience, learning preferences, and skills.',
                  icon: <GraduationCap size={32} />,
                },
                {
                  step: '02',
                  title: 'Analyze Tailored Recommendations',
                  desc: 'Review custom career matches (e.g., Full-Stack Dev, Corporate Lawyer) complete with match scores, salary data, and growth projections.',
                  icon: <Sparkles size={32} />,
                },
                {
                  step: '03',
                  title: 'Generate & Follow Your Roadmap',
                  desc: 'Select a path to generate a step-by-step learning roadmap. Access structured resources and check off milestones as you master them.',
                  icon: <Map size={32} />,
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2xl)',
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                      <span
                        className="gradient-text"
                        style={{
                          fontSize: 'var(--text-4xl)',
                          fontWeight: 800,
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {item.step}
                      </span>
                      <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{item.title}</h3>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 280,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="glass-card-static animate-float"
                      style={{
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        background: 'var(--accent-gradient-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-secondary-light)',
                        border: '2px dashed var(--accent-primary)',
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section" style={{ borderTop: '1px solid var(--border-glass)', textAlign: 'center' }}>
          <div className="container container-sm">
            <div
              className="glass-card animate-pulse-glow"
              style={{
                padding: 'var(--space-3xl)',
                background: 'var(--accent-gradient-subtle)',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-md)' }}>
                Ready to Accelerate Your Career?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', fontSize: 'var(--text-base)' }}>
                Join thousands of career switchers and professionals who are mapping out their paths with AI.
              </p>
              <Link
                id="footer-cta-start"
                to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}
                className="btn btn-primary btn-lg"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
