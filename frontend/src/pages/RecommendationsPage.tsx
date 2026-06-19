import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import CareerCard from '@/components/recommendation/CareerCard';
import Loader from '@/components/common/Loader';
import { recommendationService } from '@/services/recommendationService';
import { useRoadmap } from '@/hooks/useRoadmap';
import type { CareerRecommendation } from '@/types/career.types';
import { ROUTES } from '@/utils/constants';

export default function RecommendationsPage() {
  const navigate = useNavigate();
  const { generateRoadmap, isLoading: isGenerating } = useRoadmap();
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await recommendationService.getRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const handleGenerateRoadmap = async (careerId: string) => {
    const roadmap = await generateRoadmap(careerId);
    if (roadmap) {
      // Store the roadmap id or direct navigation
      navigate(ROUTES.ROADMAP);
    }
  };

  if (isLoading) {
    return <Loader message="Analyzing assessment answers..." fullScreen />;
  }

  if (isGenerating) {
    return <Loader message="AI is generating your learning roadmap. This may take a few seconds..." fullScreen />;
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
              <h1 className="gradient-text" style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-xs)' }}>
                Your Recommended Careers
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Based on your diagnostic answers, these tech careers match your profile. Select one to generate a roadmap.
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

          {/* Cards Grid */}
          <div className="grid-3" style={{ alignItems: 'start' }}>
            {recommendations.map((career, index) => (
              <CareerCard
                key={career.id}
                career={career}
                index={index}
                onGenerateRoadmap={handleGenerateRoadmap}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
