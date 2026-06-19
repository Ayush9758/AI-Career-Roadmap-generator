import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Compass, CheckCircle2, Calendar, ArrowRight, Sparkles, Map } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import ProgressTracker from '@/components/dashboard/ProgressTracker';
import Loader from '@/components/common/Loader';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import type { DashboardStats } from '@/types/user.types';
import { ROUTES } from '@/utils/constants';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await userService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return <Loader message="Loading dashboard..." fullScreen />;
  }

  const hasTakenAssessment = stats.assessmentsTaken > 0;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div className="dashboard-layout" style={{ flex: 1, paddingTop: 80 }}>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content */}
        <main className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {/* Welcome Header */}
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.welcomeText}>
                Welcome Back, <span className="gradient-text">{user?.name || 'Explorer'}</span>!
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Here is an overview of your career learning path diagnostics.
              </p>
            </div>

            <button
              className="show-mobile btn btn-secondary btn-sm"
              onClick={() => setSidebarOpen(true)}
              style={{ display: 'none' }}
            >
              Toggle Navigation
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid-bento">
            <StatsCard
              icon={<ClipboardList size={22} />}
              label="Assessments Taken"
              value={stats.assessmentsTaken}
              color="#7c3aed"
            />
            <StatsCard
              icon={<Compass size={22} />}
              label="Careers Explored"
              value={stats.careersExplored}
              color="#06b6d4"
            />
            <StatsCard
              icon={<CheckCircle2 size={22} />}
              label="Milestones Completed"
              value={`${stats.milestonesCompleted} / ${stats.totalMilestones}`}
              color="#10b981"
            />
            <StatsCard
              icon={<Calendar size={22} />}
              label="Streak"
              value={`${stats.currentStreak} Days`}
              color="#f59e0b"
            />
          </div>

          {/* Main Content Area */}
          {!hasTakenAssessment ? (
            /* Call to Action to Take Assessment */
            <div className="glass-card animate-pulse-glow" style={styles.ctaCard}>
              <div style={styles.ctaIconContainer}>
                <Sparkles size={40} color="var(--accent-secondary-light)" />
              </div>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-md)' }}>
                Unlock Your Personal Career Roadmap
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto var(--space-xl)', lineHeight: 1.6 }}>
                You haven't taken the career assessment yet. Discover the career paths that match your skills, preferences, and goals, and generate a customized step-by-step roadmap.
              </p>
              <button
                id="dashboard-start-assessment-btn"
                className="btn btn-primary btn-lg"
                onClick={() => navigate(ROUTES.ASSESSMENT)}
              >
                Take Assessment Now
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            /* Active Progress and Details */
            <div style={styles.dashboardGrid}>
              {/* Left Column: Progress */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <h3 style={styles.sectionTitle}>Active Roadmap Progress</h3>
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <ProgressTracker
                    progress={(stats.milestonesCompleted / stats.totalMilestones) * 100}
                    milestonesCompleted={stats.milestonesCompleted}
                    totalMilestones={stats.totalMilestones}
                  />
                </div>
                <button
                  id="dashboard-view-roadmap-btn"
                  className="btn btn-primary w-full"
                  onClick={() => navigate(ROUTES.ROADMAP)}
                  style={{ marginTop: 'var(--space-md)' }}
                >
                  <Map size={18} />
                  View Interactive Roadmap
                </button>
              </div>

              {/* Right Column: Next Steps */}
              <div style={{ flex: 1.5, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <h3 style={styles.sectionTitle}>Next Steps</h3>
                <div className="glass-card-static" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
                    Your next milestone is:
                  </p>
                  <div
                    style={{
                      borderLeft: '4px solid var(--accent-secondary)',
                      paddingLeft: 'var(--space-md)',
                      margin: 'var(--space-sm) 0',
                    }}
                  >
                    <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 4 }}>
                      Git & Version Control
                    </h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      Learn how to manage repositories, branch, merge, and collaborate on projects.
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(ROUTES.ROADMAP)}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    Jump into Learning
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--space-md)',
  },

  welcomeText: {
    fontSize: 'var(--text-4xl)',
    fontWeight: 800,
    marginBottom: 'var(--space-xs)',
    lineHeight: 1.2,
  },

  ctaCard: {
    textAlign: 'center',
    padding: 'var(--space-3xl) var(--space-xl)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'var(--accent-gradient-subtle)',
  },

  ctaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'rgba(6, 182, 212, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'var(--space-lg)',
    border: '1px solid rgba(6, 182, 212, 0.2)',
  },

  dashboardGrid: {
    display: 'flex',
    gap: 'var(--space-xl)',
    flexWrap: 'wrap',
  },

  sectionTitle: {
    fontSize: 'var(--text-xl)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
};
