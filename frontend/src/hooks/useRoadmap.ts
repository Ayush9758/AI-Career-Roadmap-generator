import { useState, useCallback } from 'react';
import type { Roadmap } from '@/types/roadmap.types';
import { roadmapService } from '@/services/roadmapService';

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = useCallback(async (careerId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await roadmapService.generateRoadmap(careerId);
      setRoadmap(data);
      return data;
    } catch {
      setError('Failed to generate roadmap. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRoadmap = useCallback(async (roadmapId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await roadmapService.getRoadmap(roadmapId);
      setRoadmap(data);
    } catch {
      setError('Failed to load roadmap.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleMilestone = useCallback(
    async (milestoneId: string) => {
      if (!roadmap) return;

      // Optimistic update
      const updatedPhases = roadmap.phases.map((phase) => ({
        ...phase,
        milestones: phase.milestones.map((ms) =>
          ms.id === milestoneId
            ? {
                ...ms,
                completed: !ms.completed,
                completedAt: !ms.completed ? new Date().toISOString() : undefined,
              }
            : ms
        ),
      }));

      // Recalculate progress
      const totalMilestones = updatedPhases.reduce((sum, p) => sum + p.milestones.length, 0);
      const completedMilestones = updatedPhases.reduce(
        (sum, p) => sum + p.milestones.filter((m) => m.completed).length,
        0
      );

      const updatedPhasesWithProgress = updatedPhases.map((phase) => ({
        ...phase,
        progress: phase.milestones.length
          ? Math.round(
              (phase.milestones.filter((m) => m.completed).length / phase.milestones.length) * 100
            )
          : 0,
      }));

      setRoadmap({
        ...roadmap,
        phases: updatedPhasesWithProgress,
        overallProgress: totalMilestones
          ? Math.round((completedMilestones / totalMilestones) * 100)
          : 0,
      });

      // Fire API call in background
      try {
        const milestone = roadmap.phases
          .flatMap((p) => p.milestones)
          .find((m) => m.id === milestoneId);
        if (milestone) {
          await roadmapService.updateMilestone(roadmap.id, milestoneId, !milestone.completed);
        }
      } catch {
        // Revert on error (simplified — in production we'd revert state)
        console.error('Failed to update milestone');
      }
    },
    [roadmap]
  );

  return {
    roadmap,
    isLoading,
    error,
    generateRoadmap,
    loadRoadmap,
    toggleMilestone,
  };
}
