import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import AssessmentForm from '@/components/assessment/AssessmentForm';
import { ASSESSMENT_QUESTIONS } from '@/utils/constants';

export default function AssessmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <h1 className="gradient-text" style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-xs)' }}>
                Career Assessment
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Let our AI understand your background, skills, and preferences to build your ideal roadmap.
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

          {/* Form */}
          <div className="glass-card-static" style={{ padding: 'var(--space-2xl)' }}>
            <AssessmentForm questions={ASSESSMENT_QUESTIONS} />
          </div>
        </main>
      </div>
    </div>
  );
}
