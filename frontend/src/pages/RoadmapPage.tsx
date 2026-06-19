import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import RoadmapCard from '@/components/roadmap/RoadmapCard';
import MilestoneCard from '@/components/roadmap/MilestoneCard';
import Loader from '@/components/common/Loader';
import { useRoadmap } from '@/hooks/useRoadmap';
import { ROUTES } from '@/utils/constants';

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { roadmap, isLoading, error, loadRoadmap, toggleMilestone } = useRoadmap();
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({ 'phase-1': true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!roadmap) {
      loadRoadmap('latest');
    }
  }, [roadmap, loadRoadmap]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  if (isLoading) {
    return <Loader message="Loading learning roadmap..." fullScreen />;
  }

  if (error || !roadmap) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <div className="dashboard-layout" style={{ flex: 1, paddingTop: 80 }}>
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Content */}
          <main className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', textAlign: 'center', marginTop: '10%' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>No Active Roadmap Found</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, lineHeight: 1.6 }}>
              You haven't generated a career roadmap yet. Please take the career assessment first to get personalized recommendations.
            </p>
            <button className="btn btn-primary" onClick={() => navigate(ROUTES.ASSESSMENT)} style={{ marginTop: 'var(--space-md)' }}>
              Take Assessment Now
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div className="dashboard-layout" style={{ flex: 1, paddingTop: 80 }}>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content */}
        <main className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-secondary-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Your Personalized Path
              </span>
              <h1 className="gradient-text" style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, margin: '4px 0 8px' }}>
                {roadmap.careerTitle} Roadmap
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Track your study progress, master milestones, and access hand-picked learning resources.
              </p>
            </div>
            <button
              className="show-mobile btn btn-secondary btn-sm"
              onClick={() => setSidebarOpen(true)}
              style={{ display: 'none' }}
            >
              Navigation
            </button>
          </div>

          {/* Overall Progress Panel */}
          <div className="glass-card-static" style={styles.progressPanel}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Total Roadmap Progress</span>
              <span style={styles.progressValue}>{roadmap.overallProgress}% Complete</span>
            </div>
            <div className="progress-bar" style={{ height: 12 }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${roadmap.overallProgress}%` }}
              />
            </div>
          </div>

          {/* Timeline of Phases */}
          <div style={styles.timelineContainer}>
            {roadmap.phases.map((phase) => (
              <RoadmapCard
                key={phase.id}
                phase={phase}
                isExpanded={!!expandedPhases[phase.id]}
                onToggle={() => togglePhase(phase.id)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {phase.milestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onToggle={toggleMilestone}
                    />
                  ))}
                </div>
              </RoadmapCard>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  progressPanel: {
    padding: 'var(--space-xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    fontSize: 'var(--text-base)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },

  progressValue: {
    fontSize: 'var(--text-base)',
    fontWeight: 700,
    color: 'var(--accent-secondary-light)',
  },

  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
    position: 'relative',
    marginTop: 'var(--space-md)',
  },
};
